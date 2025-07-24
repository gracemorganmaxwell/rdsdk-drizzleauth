"use client";

import type { posts } from "@/db/schema";
import { deletePost } from "@/app/pages/admin/posts/serverFunctions";
import { link } from "@/app/shared/links";

type Post = typeof posts.$inferSelect;

export default function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-lg shadow">
        <h3 className="text-xl font-bold text-gray-700">No posts yet</h3>
        <p className="text-gray-500 mt-2">
          Get started by creating your first post.
        </p>
        <a
          href={link("/admin/posts/new")}
          className="mt-6 inline-block bg-navy-blue text-white font-bold py-2 px-4 rounded hover:bg-opacity-90 transition-colors"
        >
          Create Post
        </a>
      </div>
    );
  }

  const handleDelete = async (formData: FormData) => {
    try {
      await deletePost(formData);
      // Consider a more sophisticated feedback mechanism than a full page reload
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete post:", error);
      alert("Failed to delete post. See console for details.");
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
              Published
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
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {post.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {post.published ? (
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
                {new Date(post.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a
                  href={link("/admin/posts/edit/:id", { id: post.id })}
                  className="text-navy-blue hover:text-opacity-80"
                >
                  Edit
                </a>
                <form action={handleDelete} className="inline-block ml-4">
                  <input type="hidden" name="postId" value={post.id} />
                  <button
                    type="submit"
                    className="text-red-600 hover:text-red-800"
                    onClick={(e) => {
                      if (
                        !confirm("Are you sure you want to delete this post?")
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
