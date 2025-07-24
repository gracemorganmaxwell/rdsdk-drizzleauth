import { z } from "zod";

export const tagSchema = z.object({
  name: z.string().min(1, "Tag name is required"),
  description: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
});

export const updateTagSchema = tagSchema.extend({
  id: z.string().uuid("A valid tag ID is required for an update."),
});

export type TagFormInput = z.infer<typeof tagSchema>;
