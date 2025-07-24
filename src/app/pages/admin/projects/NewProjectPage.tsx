import AdminLayout from "@/app/layouts/AdminLayout";
import { ProjectForm } from "@/app/components/forms/ProjectForm";
import { createProject } from "./serverFunctions";

export default function NewProjectPage() {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Create New Project</h1>
      <ProjectForm action={createProject} />
    </AdminLayout>
  );
}
