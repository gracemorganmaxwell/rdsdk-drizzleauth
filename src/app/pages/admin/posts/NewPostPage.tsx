import AdminLayout from "@/app/layouts/AdminLayout";
import { PostForm } from "@/app/components/forms/PostForm";
import { createPost } from "./serverFunctions";

export default function NewPostPage() {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      <PostForm action={createPost} />
    </AdminLayout>
  );
}
