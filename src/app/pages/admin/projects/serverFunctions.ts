"use server";

import { db } from "@/db";
import { projects } from "@/db/schema";
import { requestInfo } from "rwsdk/worker";
import {
  projectSchema,
  updateProjectSchema,
} from "@/lib/validation/projectSchema";
import { eq } from "drizzle-orm";

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

export async function createProject(prevState: any, formData: FormData) {
  const { ctx } = requestInfo as any;
  const authorId = ctx.user?.id;

  if (!authorId) {
    return { success: false, errors: { _server: ["Unauthorized"] } };
  }

  const formValues = Object.fromEntries(formData.entries());
  const parsed = projectSchema.safeParse({
    ...formValues,
    featured: formValues.featured === "on",
  });

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  try {
    const slug = slugify(parsed.data.title);
    await db.insert(projects).values({
      ...parsed.data,
      authorId,
      slug,
    });
  } catch (e) {
    return {
      success: false,
      errors: {
        _server: ["Failed to create project due to a database error."],
      },
    };
  }

  return { success: true };
}

export async function updateProject(prevState: any, formData: FormData) {
  const { ctx } = requestInfo as any;
  const authorId = ctx.user?.id;

  if (!authorId) {
    return { success: false, errors: { _server: ["Unauthorized"] } };
  }

  const formValues = Object.fromEntries(formData.entries());
  const parsed = updateProjectSchema.safeParse({
    ...formValues,
    featured: formValues.featured === "on",
  });

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  try {
    const { id, ...projectData } = parsed.data;
    const slug = slugify(projectData.title);

    await db
      .update(projects)
      .set({ ...projectData, slug })
      .where(eq(projects.id, id));
  } catch (e) {
    return {
      success: false,
      errors: {
        _server: ["Failed to update project due to a database error."],
      },
    };
  }

  return { success: true };
}

export async function deleteProject(formData: FormData) {
  const { ctx } = requestInfo as any;
  const authorId = ctx.user?.id;

  if (!authorId) {
    throw new Error("Unauthorized");
  }

  const projectId = formData.get("projectId") as string;
  if (!projectId) {
    throw new Error("Project ID is required");
  }

  try {
    await db.delete(projects).where(eq(projects.id, projectId));
  } catch (e) {
    throw new Error("Failed to delete project.");
  }

  return { success: true };
}
