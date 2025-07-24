"use client";

import type { tags } from "@/db/schema";
import { deleteTag } from "@/app/pages/admin/tags/serverFunctions";
import { link } from "@/app/shared/links";

type Tag = typeof tags.$inferSelect;

export default function TagList({ tags }: { tags: Tag[] }) {
  if (tags.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-lg shadow">
        <h3 className="text-xl font-bold text-gray-700">No tags yet</h3>
        <p className="text-gray-500 mt-2">
          Get started by creating your first tag.
        </p>
        <a
          href={link("/admin/tags/new")}
          className="mt-6 inline-block bg-navy-blue text-white font-bold py-2 px-4 rounded hover:bg-opacity-90 transition-colors"
        >
          Create Tag
        </a>
      </div>
    );
  }

  const handleDelete = async (formData: FormData) => {
    try {
      await deleteTag(formData);
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete tag:", error);
      alert("Failed to delete tag. See console for details.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Color
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Created At
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tags.map((tag) => (
            <tr key={tag.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {tag.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span
                  className="p-2 rounded-full"
                  style={{ backgroundColor: tag.color ?? "#ffffff" }}
                ></span>
                <span className="ml-2">{tag.color}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(tag.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a
                  href={link("/admin/tags/edit/:id", { id: tag.id })}
                  className="text-navy-blue hover:text-opacity-80"
                >
                  Edit
                </a>
                <form action={handleDelete} className="inline-block ml-4">
                  <input type="hidden" name="tagId" value={tag.id} />
                  <button
                    type="submit"
                    className="text-red-600 hover:text-red-800"
                    onClick={(e) => {
                      if (
                        !confirm("Are you sure you want to delete this tag?")
                      ) {
                        e.preventDefault();
                      }
                    }}
                  >
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
