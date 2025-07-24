"use server";

import { db } from "@/db";
import { posts } from "@/db/schema";
import { requestInfo } from "rwsdk/worker";
import { postSchema, updatePostSchema } from "@/lib/validation/postSchema";
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

export async function createPost(prevState: any, formData: FormData) {
  const { ctx } = requestInfo as any;
  const authorId = ctx.user?.id;

  if (!authorId) {
    return { success: false, errors: { _server: ["Unauthorized"] } };
  }

  const formValues = Object.fromEntries(formData.entries());
  const parsed = postSchema.safeParse({
    ...formValues,
    published: formValues.published === "on",
  });

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  try {
    const slug = parsed.data.slug || slugify(parsed.data.title);

    await db.insert(posts).values({
      ...parsed.data,
      slug,
      authorId,
    });
  } catch (e) {
    if (e instanceof Error && e.message.includes("UNIQUE constraint failed")) {
      return {
        success: false,
        errors: { slug: ["A post with this slug already exists."] },
      };
    }
    return {
      success: false,
      errors: { _server: ["Failed to create post due to a database error."] },
    };
  }

  // Instead of redirecting, we return a success state.
  // The client component will handle the redirect.
  return { success: true };
}

export async function updatePost(prevState: any, formData: FormData) {
  const { ctx } = requestInfo as any;
  const authorId = ctx.user?.id;

  if (!authorId) {
    return { success: false, errors: { _server: ["Unauthorized"] } };
  }

  const formValues = Object.fromEntries(formData.entries());
  const parsed = updatePostSchema.safeParse({
    ...formValues,
    published: formValues.published === "on",
  });

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  try {
    const { id, ...postData } = parsed.data;
    const slug = postData.slug || slugify(postData.title);

    await db
      .update(posts)
      .set({
        ...postData,
        slug,
      })
      .where(eq(posts.id, id));
  } catch (e) {
    if (e instanceof Error && e.message.includes("UNIQUE constraint failed")) {
      return {
        success: false,
        errors: { slug: ["A post with this slug already exists."] },
      };
    }
    return {
      success: false,
      errors: { _server: ["Failed to update post due to a database error."] },
    };
  }

  return { success: true };
}

export async function deletePost(formData: FormData) {
  const { ctx } = requestInfo as any;
  const authorId = ctx.user?.id;

  if (!authorId) {
    // In a real app, you'd handle this more gracefully.
    throw new Error("Unauthorized");
  }

  const postId = formData.get("postId") as string;
  if (!postId) {
    throw new Error("Post ID is required");
  }

  try {
    await db.delete(posts).where(eq(posts.id, postId));
  } catch (e) {
    throw new Error("Failed to delete post.");
  }

  // In this simple case, we might not need a redirect,
  // as the page can just re-fetch data.
  // For a better UX, you might `redirect('/admin/posts')` here.
  return { success: true };
}
