import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import AdminLayout from "@/app/layouts/AdminLayout";
import { ProjectForm } from "@/app/components/forms/ProjectForm";
import { updateProject } from "./serverFunctions";

export default async function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await db.query.projects.findFirst({
    where: eq(projects.id, params.id),
  });

  if (!project) {
    return (
      <AdminLayout>
        <h1 className="text-2xl font-bold">Project not found</h1>
        <p>The project you are trying to edit does not exist.</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Edit Project</h1>
      <ProjectForm action={updateProject} initialData={project} />
    </AdminLayout>
  );
}
