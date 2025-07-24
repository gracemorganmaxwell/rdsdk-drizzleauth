"use server";

import { db } from "@/db";
import { tags } from "@/db/schema";
import { requestInfo } from "rwsdk/worker";
import { tagSchema, updateTagSchema } from "@/lib/validation/tagSchema";
import { eq } from "drizzle-orm";

export async function createTag(prevState: any, formData: FormData) {
  const { ctx } = requestInfo as any;
  const authorId = ctx.user?.id;

  if (!authorId) {
    return { success: false, errors: { _server: ["Unauthorized"] } };
  }

  const parsed = tagSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  try {
    await db.insert(tags).values(parsed.data);
  } catch (e) {
    if (e instanceof Error && e.message.includes("UNIQUE constraint failed")) {
      return {
        success: false,
        errors: { name: ["A tag with this name already exists."] },
      };
    }
    return {
      success: false,
      errors: { _server: ["Failed to create tag due to a database error."] },
    };
  }

  return { success: true };
}

export async function updateTag(prevState: any, formData: FormData) {
  const { ctx } = requestInfo as any;
  const authorId = ctx.user?.id;

  if (!authorId) {
    return { success: false, errors: { _server: ["Unauthorized"] } };
  }

  const parsed = updateTagSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  try {
    const { id, ...tagData } = parsed.data;
    await db.update(tags).set(tagData).where(eq(tags.id, id));
  } catch (e) {
    if (e instanceof Error && e.message.includes("UNIQUE constraint failed")) {
      return {
        success: false,
        errors: { name: ["A tag with this name already exists."] },
      };
    }
    return {
      success: false,
      errors: { _server: ["Failed to update tag due to a database error."] },
    };
  }

  return { success: true };
}

export async function deleteTag(formData: FormData) {
  const { ctx } = requestInfo as any;
  const authorId = ctx.user?.id;

  if (!authorId) {
    throw new Error("Unauthorized");
  }

  const tagId = formData.get("tagId") as string;
  if (!tagId) {
    throw new Error("Tag ID is required");
  }

  try {
    await db.delete(tags).where(eq(tags.id, tagId));
  } catch (e) {
    throw new Error("Failed to delete tag.");
  }

  return { success: true };
}
