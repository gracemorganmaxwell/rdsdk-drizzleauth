"use client";

import { useFormState } from "react-dom";
import type { ProjectFormInput } from "@/lib/validation/projectSchema";
import { link } from "@/app/shared/links";
import { useEffect } from "react";

type ServerAction = (
  prevState: any,
  formData: FormData
) => Promise<{ success: boolean; errors?: any }>;

type ProjectFormProps = {
  action: ServerAction;
  initialData?: ProjectFormInput & { id?: string };
};

export function ProjectForm({ action, initialData }: ProjectFormProps) {
  const [state, formAction] = useFormState(action, { success: false });

  useEffect(() => {
    if (state.success) {
      window.location.href = link("/admin/projects");
    }
  }, [state.success]);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <form action={formAction} className="space-y-6">
        <input type="hidden" name="id" defaultValue={initialData?.id} />

        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={initialData?.title}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-navy-blue focus:border-navy-blue sm:text-sm"
          />
          {state.errors?.title && (
            <p className="mt-2 text-sm text-red-600">{state.errors.title[0]}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={initialData?.description ?? ""}
            rows={5}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-navy-blue focus:border-navy-blue sm:text-sm"
          ></textarea>
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            defaultValue={initialData?.content ?? ""}
            rows={10}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-navy-blue focus:border-navy-blue sm:text-sm"
          ></textarea>
          {state.errors?.content && (
            <p className="mt-2 text-sm text-red-600">
              {state.errors.content[0]}
            </p>
          )}
        </div>

        {/* GitHub URL */}
        <div>
          <label
            htmlFor="githubUrl"
            className="block text-sm font-medium text-gray-700"
          >
            GitHub URL
          </label>
          <input
            type="url"
            id="githubUrl"
            name="githubUrl"
            defaultValue={initialData?.githubUrl ?? ""}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-navy-blue focus:border-navy-blue sm:text-sm"
          />
        </div>

        {/* Live URL */}
        <div>
          <label
            htmlFor="liveUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Live URL
          </label>
          <input
            type="url"
            id="liveUrl"
            name="liveUrl"
            defaultValue={initialData?.liveUrl ?? ""}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-navy-blue focus:border-navy-blue sm:text-sm"
          />
        </div>

        {/* YouTube URL */}
        <div>
          <label
            htmlFor="youtubeURL"
            className="block text-sm font-medium text-gray-700"
          >
            YouTube URL
          </label>
          <input
            type="url"
            id="youtubeURL"
            name="youtubeURL"
            defaultValue={initialData?.youtubeURL ?? ""}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-navy-blue focus:border-navy-blue sm:text-sm"
          />
        </div>

        {/* Banner Image */}
        <div>
          <label
            htmlFor="bannerImage"
            className="block text-sm font-medium text-gray-700"
          >
            Banner Image URL
          </label>
          <input
            type="url"
            id="bannerImage"
            name="bannerImage"
            defaultValue={initialData?.bannerImage ?? ""}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-navy-blue focus:border-navy-blue sm:text-sm"
          />
        </div>

        {/* Featured Checkbox */}
        <div className="flex items-center">
          <input
            id="featured"
            name="featured"
            type="checkbox"
            defaultChecked={initialData?.featured}
            className="h-4 w-4 text-navy-blue focus:ring-navy-blue border-gray-300 rounded"
          />
          <label
            htmlFor="featured"
            className="ml-2 block text-sm text-gray-900"
          >
            Featured Project
          </label>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-navy-blue hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-blue"
        >
          Save Project
        </button>
        {state.success && (
          <p className="mt-4 text-sm text-green-600">
            Project saved successfully!
          </p>
        )}
      </form>
      <div className="mt-6 text-center">
        <a
          href={link("/admin/projects")}
          className="text-sm font-medium text-gray-600 hover:text-navy-blue"
        >
          Back to Projects
        </a>
      </div>
    </div>
  );
}
