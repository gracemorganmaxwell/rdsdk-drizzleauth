import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  // The slug will be generated on the server.
  slug: z.string().optional(),
  excerpt: z.string().optional().nullable(),
  bannerImage: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .nullable()
    .or(z.literal("")),
  published: z.boolean().default(false),
});

export const updatePostSchema = postSchema.extend({
  id: z.string().uuid("A valid post ID is required for an update."),
});

export type PostFormInput = z.infer<typeof postSchema>;
