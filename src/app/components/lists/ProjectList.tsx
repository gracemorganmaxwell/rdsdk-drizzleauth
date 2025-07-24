"use client";

import type { projects } from "@/db/schema";
import { deleteProject } from "@/app/pages/admin/projects/serverFunctions";
import { link } from "@/app/shared/links";

type Project = typeof projects.$inferSelect;

export default function ProjectList({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-lg shadow">
        <h3 className="text-xl font-bold text-gray-700">No projects yet</h3>
        <p className="text-gray-500 mt-2">
          Get started by creating your first project.
        </p>
        <a
          href={link("/admin/projects/new")}
          className="mt-6 inline-block bg-navy-blue text-white font-bold py-2 px-4 rounded hover:bg-opacity-90 transition-colors"
        >
          Create Project
        </a>
      </div>
    );
  }

  const handleDelete = async (formData: FormData) => {
    try {
      await deleteProject(formData);
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete project:", error);
      alert("Failed to delete project. See console for details.");
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
              Title
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Featured
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
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {project.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {project.featured ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Yes
                  </span>
                ) : (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    No
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(project.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a
                  href={link("/admin/projects/edit/:id", { id: project.id })}
                  className="text-navy-blue hover:text-opacity-80"
                >
                  Edit
                </a>
                <form action={handleDelete} className="inline-block ml-4">
                  <input type="hidden" name="projectId" value={project.id} />
                  <button
                    type="submit"
                    className="text-red-600 hover:text-red-800"
                    onClick={(e) => {
                      if (
                        !confirm(
                          "Are you sure you want to delete this project?"
                        )
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
