import { db } from "@/db";
import { posts, users } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { Suspense } from "react";
import AdminLayout from "@/app/layouts/AdminLayout";
import PostList from "@/app/components/lists/PostList";

export default async function PostsPage() {
  const posts = await db.query.posts.findMany({
    orderBy: (posts, { desc }) => [desc(posts.createdAt)],
  });

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Posts</h1>
        <a
          href="/admin/posts/new"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          Create New Post
        </a>
      </div>
      <PostList posts={posts} />
    </AdminLayout>
  );
}
