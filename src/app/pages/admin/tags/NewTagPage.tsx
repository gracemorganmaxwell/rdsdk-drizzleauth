import AdminLayout from "@/app/layouts/AdminLayout";
import { TagForm } from "@/app/components/forms/TagForm";
import { createTag } from "./serverFunctions";

export default function NewTagPage() {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Create New Tag</h1>
      <TagForm action={createTag} />
    </AdminLayout>
  );
}
