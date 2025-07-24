import { z } from "zod";

export const imageSchema = z.object({
  filename: z.string().min(1, "Filename is required"),
  url: z.string().url("Must be a valid URL"),
  alt: z.string().optional().nullable(),
  caption: z.string().optional().nullable(),
  postId: z.string().uuid().optional().nullable(),
  projectId: z.string().uuid().optional().nullable(),
});

export const updateImageSchema = imageSchema.extend({
  id: z.string().uuid("A valid image ID is required for an update."),
});

export type ImageFormInput = z.infer<typeof imageSchema>;
