import { AdminSidebar } from "@/app/components/AdminSidebar";
import { AdminHeader } from "@/app/components/AdminHeader";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white p-6">
        <AdminSidebar />
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-6">
          <AdminHeader />
        </header>
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
