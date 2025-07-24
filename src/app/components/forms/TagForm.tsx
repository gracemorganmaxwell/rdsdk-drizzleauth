"use client";

import { useFormState } from "react-dom";
import type { TagFormInput } from "@/lib/validation/tagSchema";
import { link } from "@/app/shared/links";
import { useEffect } from "react";

type ServerAction = (
  prevState: any,
  formData: FormData
) => Promise<{ success: boolean; errors?: any }>;

type TagFormProps = {
  action: ServerAction;
  initialData?: TagFormInput & { id?: string };
};

export function TagForm({ action, initialData }: TagFormProps) {
  const [state, formAction] = useFormState(action, { success: false });

  useEffect(() => {
    if (state.success) {
      window.location.href = link("/admin/tags");
    }
  }, [state.success]);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <form action={formAction} className="space-y-6">
        <input type="hidden" name="id" defaultValue={initialData?.id} />

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Tag Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={initialData?.name}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-navy-blue focus:border-navy-blue sm:text-sm"
          />
          {state.errors?.name && (
            <p className="mt-2 text-sm text-red-600">{state.errors.name[0]}</p>
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
            rows={4}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-navy-blue focus:border-navy-blue sm:text-sm"
          ></textarea>
        </div>

        {/* Color */}
        <div>
          <label
            htmlFor="color"
            className="block text-sm font-medium text-gray-700"
          >
            Color
          </label>
          <input
            type="color"
            id="color"
            name="color"
            defaultValue={initialData?.color ?? "#000080"}
            className="mt-1 block w-full h-10 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-navy-blue hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-blue"
        >
          Save Tag
        </button>

        {state.success && (
          <p className="mt-4 text-sm text-green-600">Tag saved successfully!</p>
        )}
      </form>
      <div className="mt-6 text-center">
        <a
          href={link("/admin/tags")}
          className="text-sm font-medium text-gray-600 hover:text-navy-blue"
        >
          Back to Tags
        </a>
      </div>
    </div>
  );
}
