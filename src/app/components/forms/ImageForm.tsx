"use client";
import { useFormState } from "react-dom";
import type { ImageFormInput } from "@/lib/validation/imageSchema";
import type { posts, projects } from "@/db/schema";
import { link } from "@/app/shared/links";
import { useEffect } from "react";

type ServerAction = (
  prevState: any,
  formData: FormData
) => Promise<{ success: boolean; errors?: any }>;

type Post = typeof posts.$inferSelect;
type Project = typeof projects.$inferSelect;

type ImageFormProps = {
  action: ServerAction;
  initialData?: ImageFormInput & { id?: string };
  posts: Post[];
  projects: Project[];
};

export function ImageForm({
  action,
  initialData,
  posts,
  projects,
}: ImageFormProps) {
  const [state, formAction] = useFormState(action, { success: false });

  useEffect(() => {
    if (state.success) {
      window.location.href = link("/admin/images");
    }
  }, [state.success]);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <form action={formAction} className="space-y-6">
        <input type="hidden" name="id" defaultValue={initialData?.id} />

        {/* Filename */}
        <div>
          <label
            htmlFor="filename"
            className="block text-sm font-medium text-gray-700"
          >
            Filename
          </label>
          <input
            type="text"
            id="filename"
            name="filename"
            defaultValue={initialData?.filename}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-navy-blue focus:border-navy-blue sm:text-sm"
          />
          {state.errors?.filename && (
            <p className="mt-2 text-sm text-red-600">
              {state.errors.filename[0]}
            </p>
          )}
        </div>

        {/* URL */}
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="url"
            id="url"
            name="url"
            defaultValue={initialData?.url}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-navy-blue focus:border-navy-blue sm:text-sm"
          />
          {state.errors?.url && (
            <p className="mt-2 text-sm text-red-600">{state.errors.url[0]}</p>
          )}
        </div>

        {/* Alt Text */}
        <div>
          <label
            htmlFor="alt"
            className="block text-sm font-medium text-gray-700"
          >
            Alt Text
          </label>
          <input
            type="text"
            id="alt"
            name="alt"
            defaultValue={initialData?.alt ?? ""}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-navy-blue focus:border-navy-blue sm:text-sm"
          />
        </div>

        {/* Caption */}
        <div>
          <label
            htmlFor="caption"
            className="block text-sm font-medium text-gray-700"
          >
            Caption
          </label>
          <textarea
            id="caption"
            name="caption"
            rows={3}
            defaultValue={initialData?.caption ?? ""}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-navy-blue focus:border-navy-blue sm:text-sm"
          />
        </div>

        {/* Associate with Post */}
        <div>
          <label
            htmlFor="postId"
            className="block text-sm font-medium text-gray-700"
          >
            Associate with Post
          </label>
          <select
            id="postId"
            name="postId"
            defaultValue={initialData?.postId ?? ""}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-navy-blue focus:border-navy-blue sm:text-sm"
          >
            <option value="">None</option>
            {posts.map((post) => (
              <option key={post.id} value={post.id}>
                {post.title}
              </option>
            ))}
          </select>
        </div>

        {/* Associate with Project */}
        <div>
          <label
            htmlFor="projectId"
            className="block text-sm font-medium text-gray-700"
          >
            Associate with Project
          </label>
          <select
            id="projectId"
            name="projectId"
            defaultValue={initialData?.projectId ?? ""}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-navy-blue focus:border-navy-blue sm:text-sm"
          >
            <option value="">None</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-navy-blue hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-blue"
        >
          Save Image
        </button>

        {state.success && (
          <p className="mt-4 text-sm text-green-600">
            Image saved successfully!
          </p>
        )}
      </form>
      <div className="mt-6 text-center">
        <a
          href={link("/admin/images")}
          className="text-sm font-medium text-gray-600 hover:text-navy-blue"
        >
          Back to Images
        </a>
      </div>
    </div>
  );
}
