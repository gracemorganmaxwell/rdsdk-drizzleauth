import { db } from "@/db";
import { desc } from "drizzle-orm";
import AdminLayout from "@/app/layouts/AdminLayout";
import TagList from "@/app/components/lists/TagList";

export default async function TagsPage() {
  const tags = await db.query.tags.findMany({
    orderBy: (tags, { desc }) => [desc(tags.createdAt)],
  });

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tags</h1>
        <a
          href="/admin/tags/new"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          Create New Tag
        </a>
      </div>
      <TagList tags={tags} />
    </AdminLayout>
  );
}
