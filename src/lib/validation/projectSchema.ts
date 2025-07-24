import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  githubUrl: z.string().url("Must be a valid URL").optional().nullable(),
  liveUrl: z.string().url("Must be a valid URL").optional().nullable(),
  bannerImage: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .nullable()
    .or(z.literal("")),
  featured: z.boolean().default(false),
  youtubeURL: z.string().url("Must be a valid URL").optional().nullable(),
});

export const updateProjectSchema = projectSchema.extend({
  id: z.string().uuid("A valid project ID is required for an update."),
});

export type ProjectFormInput = z.infer<typeof projectSchema>;
