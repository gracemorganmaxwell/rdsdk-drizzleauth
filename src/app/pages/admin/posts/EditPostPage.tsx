import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import AdminLayout from "@/app/layouts/AdminLayout";
import { PostForm } from "@/app/components/forms/PostForm";
import { updatePost } from "./serverFunctions";
import type { AppContext } from "@/app/types";

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await db.query.posts.findFirst({
    where: eq(posts.id, params.id),
  });

  if (!post) {
    return (
      <AdminLayout>
        <h1 className="text-2xl font-bold">Post not found</h1>
        <p>The post you are trying to edit does not exist.</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <PostForm action={updatePost} initialData={post} />
    </AdminLayout>
  );
}
