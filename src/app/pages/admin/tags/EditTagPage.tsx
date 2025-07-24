import { db } from "@/db";
import { tags } from "@/db/schema";
import { eq } from "drizzle-orm";
import AdminLayout from "@/app/layouts/AdminLayout";
import { TagForm } from "@/app/components/forms/TagForm";
import { updateTag } from "./serverFunctions";

export default async function EditTagPage({
  params,
}: {
  params: { id: string };
}) {
  const tag = await db.query.tags.findFirst({
    where: eq(tags.id, params.id),
  });

  if (!tag) {
    return (
      <AdminLayout>
        <h1 className="text-2xl font-bold">Tag not found</h1>
        <p>The tag you are trying to edit does not exist.</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Edit Tag</h1>
      <TagForm action={updateTag} initialData={tag} />
    </AdminLayout>
  );
}
