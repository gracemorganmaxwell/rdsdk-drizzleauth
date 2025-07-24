import AdminLayout from "@/app/layouts/AdminLayout";
import { ImageForm } from "@/app/components/forms/ImageForm";
import { createImage } from "./serverFunctions";
import { db } from "@/db";

export default async function NewImagePage() {
  const posts = await db.query.posts.findMany();
  const projects = await db.query.projects.findMany();

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Create New Image</h1>
      <ImageForm action={createImage} posts={posts} projects={projects} />
    </AdminLayout>
  );
}
