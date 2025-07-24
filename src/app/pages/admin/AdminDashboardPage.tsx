import type { AppContext } from "@/app/types";
import AdminLayout from "@/app/layouts/AdminLayout";

export default async function AdminDashboardPage({ ctx }: { ctx: any }) {
  // Cast the context to our specific AppContext to get type safety.
  const { user } = ctx as AppContext;

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">
          Welcome, {user?.name || "Admin"}!
        </h1>
        <p>This is your central control panel for Gracie's Custard OS.</p>
      </div>
    </AdminLayout>
  );
}
