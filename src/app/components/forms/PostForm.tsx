"use client";
import { useFormState } from "react-dom";
import type { PostFormInput } from "@/lib/validation/postSchema";
import { link } from "@/app/shared/links";
import { useEffect } from "react";

type ServerAction = (
  prevState: any,
  formData: FormData
) => Promise<{ success: boolean; errors?: any }>;

type PostFormProps = {
  action: ServerAction;
  initialData?: PostFormInput & { id?: string };
};

export function PostForm({ action, initialData }: PostFormProps) {
  const [state, formAction] = useFormState(action, { success: false });

  useEffect(() => {
    if (state.success) {
      window.location.href = link("/admin/posts");
    }
  }, [state.success]);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <form action={formAction} className="space-y-6">
        <input type="hidden" name="id" defaultValue={initialData?.id} />

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
            defaultValue={initialData?.content}
            required
            rows={10}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-navy-blue focus:border-navy-blue sm:text-sm"
          ></textarea>
          {state.errors?.content && (
            <p className="mt-2 text-sm text-red-600">
              {state.errors.content[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="excerpt"
            className="block text-sm font-medium text-gray-700"
          >
            Excerpt
          </label>
          <input
            type="text"
            id="excerpt"
            name="excerpt"
            defaultValue={initialData?.excerpt ?? ""}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-navy-blue focus:border-navy-blue sm:text-sm"
          />
        </div>

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
          {state.errors?.bannerImage && (
            <p className="mt-2 text-sm text-red-600">
              {state.errors.bannerImage[0]}
            </p>
          )}
        </div>

        <div className="flex items-center">
          <input
            id="published"
            name="published"
            type="checkbox"
            defaultChecked={initialData?.published}
            className="h-4 w-4 text-navy-blue focus:ring-navy-blue border-gray-300 rounded"
          />
          <label
            htmlFor="published"
            className="ml-2 block text-sm text-gray-900"
          >
            Published
          </label>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-navy-blue hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-blue"
        >
          Save Post
        </button>

        {state.success && (
          <p className="mt-4 text-sm text-green-600">
            Post saved successfully!
          </p>
        )}
      </form>
      <div className="mt-6 text-center">
        <a
          href={link("/admin/posts")}
          className="text-sm font-medium text-gray-600 hover:text-navy-blue"
        >
          Back to Posts
        </a>
      </div>
    </div>
  );
}
