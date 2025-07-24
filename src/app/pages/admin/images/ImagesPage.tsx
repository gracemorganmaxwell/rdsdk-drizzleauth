import { db } from "@/db";
import AdminLayout from "@/app/layouts/AdminLayout";
import ImageList from "@/app/components/lists/ImageList";

export default async function ImagesPage() {
  const images = await db.query.images.findMany({
    orderBy: (images, { desc }) => [desc(images.createdAt)],
  });

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Images</h1>
        <a
          href="/admin/images/new"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          Add New Image
        </a>
      </div>
      <ImageList images={images} />
    </AdminLayout>
  );
}
