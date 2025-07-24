"use client";

import type { images } from "@/db/schema";
import { deleteImage } from "@/app/pages/admin/images/serverFunctions";
import { link } from "@/app/shared/links";

type Image = typeof images.$inferSelect;

export default function ImageList({ images }: { images: Image[] }) {
  if (images.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-lg shadow">
        <h3 className="text-xl font-bold text-gray-700">No images yet</h3>
        <p className="text-gray-500 mt-2">
          Get started by uploading your first image.
        </p>
        <a
          href={link("/admin/images/new")}
          className="mt-6 inline-block bg-navy-blue text-white font-bold py-2 px-4 rounded hover:bg-opacity-90 transition-colors"
        >
          Upload Image
        </a>
      </div>
    );
  }

  const handleDelete = async (formData: FormData) => {
    try {
      await deleteImage(formData);
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete image:", error);
      alert("Failed to delete image. See console for details.");
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
              Image
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Filename
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
          {images.map((image) => (
            <tr key={image.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={image.url}
                  alt={image.alt ?? ""}
                  className="h-10 w-10 rounded-full object-cover"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {image.filename}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(image.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a
                  href={link("/admin/images/edit/:id", { id: image.id })}
                  className="text-navy-blue hover:text-opacity-80"
                >
                  Edit
                </a>
                <form action={handleDelete} className="inline-block ml-4">
                  <input type="hidden" name="imageId" value={image.id} />
                  <button
                    type="submit"
                    className="text-red-600 hover:text-red-800"
                    onClick={(e) => {
                      if (
                        !confirm("Are you sure you want to delete this image?")
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
