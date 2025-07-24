"use server";

import { db } from "@/db";
import { images } from "@/db/schema";
import { requestInfo } from "rwsdk/worker";
import { imageSchema, updateImageSchema } from "@/lib/validation/imageSchema";
import { eq } from "drizzle-orm";

function processImageData(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  // Remove empty strings for optional foreign keys before validation
  if (data.postId === "") delete data.postId;
  if (data.projectId === "") delete data.projectId;
  return data;
}

export async function createImage(prevState: any, formData: FormData) {
  const { ctx } = requestInfo as any;
  const authorId = ctx.user?.id;

  if (!authorId) {
    return { success: false, errors: { _server: ["Unauthorized"] } };
  }

  const data = processImageData(formData);
  const parsed = imageSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  try {
    await db.insert(images).values(parsed.data);
  } catch (e) {
    return {
      success: false,
      errors: { _server: ["Failed to create image due to a database error."] },
    };
  }

  return { success: true };
}

export async function updateImage(prevState: any, formData: FormData) {
  const { ctx } = requestInfo as any;
  const authorId = ctx.user?.id;

  if (!authorId) {
    return { success: false, errors: { _server: ["Unauthorized"] } };
  }

  const data = processImageData(formData);
  const parsed = updateImageSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  try {
    const { id, ...imageData } = parsed.data;
    await db.update(images).set(imageData).where(eq(images.id, id));
  } catch (e) {
    return {
      success: false,
      errors: { _server: ["Failed to update image due to a database error."] },
    };
  }

  return { success: true };
}

export async function deleteImage(formData: FormData) {
  const { ctx } = requestInfo as any;
  const authorId = ctx.user?.id;

  if (!authorId) {
    throw new Error("Unauthorized");
  }

  const imageId = formData.get("imageId") as string;
  if (!imageId) {
    throw new Error("Image ID is required");
  }

  try {
    // This will only delete the database record, not the file from storage.
    await db.delete(images).where(eq(images.id, imageId));
  } catch (e) {
    throw new Error("Failed to delete image.");
  }

  return { success: true };
}
