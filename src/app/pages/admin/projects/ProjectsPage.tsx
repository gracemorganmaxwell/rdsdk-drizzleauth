import { db } from "@/db";
import { desc } from "drizzle-orm";
import AdminLayout from "@/app/layouts/AdminLayout";
import ProjectList from "@/app/components/lists/ProjectList";

export default async function ProjectsPage() {
  const projects = await db.query.projects.findMany({
    orderBy: (projects, { desc }) => [desc(projects.createdAt)],
  });

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <a
          href="/admin/projects/new"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          Create New Project
        </a>
      </div>
      <ProjectList projects={projects} />
    </AdminLayout>
  );
}
