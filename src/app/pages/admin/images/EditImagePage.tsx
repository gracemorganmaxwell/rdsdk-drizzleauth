import { db } from "@/db";
import { images } from "@/db/schema";
import { eq } from "drizzle-orm";
import AdminLayout from "@/app/layouts/AdminLayout";
import { ImageForm } from "@/app/components/forms/ImageForm";
import { updateImage } from "./serverFunctions";

export default async function EditImagePage({
  params,
}: {
  params: { id: string };
}) {
  const image = await db.query.images.findFirst({
    where: eq(images.id, params.id),
  });

  if (!image) {
    return (
      <AdminLayout>
        <h1 className="text-2xl font-bold">Image not found</h1>
        <p>The image you are trying to edit does not exist.</p>
      </AdminLayout>
    );
  }

  const posts = await db.query.posts.findMany();
  const projects = await db.query.projects.findMany();

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Edit Image</h1>
      <ImageForm
        action={updateImage}
        initialData={image}
        posts={posts}
        projects={projects}
      />
    </AdminLayout>
  );
}
