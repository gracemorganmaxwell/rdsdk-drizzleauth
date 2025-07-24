"use client";

import { link } from "@/app/shared/links";

export function AdminSidebar() {
  const navLinks = [
    { href: link("/admin"), label: "Dashboard" },
    { href: link("/admin/posts"), label: "Posts" },
    { href: link("/admin/projects"), label: "Projects" },
    { href: link("/admin/tags"), label: "Tags" },
    { href: link("/admin/images"), label: "Images" },
  ];

  return (
    <nav className="flex flex-col space-y-2">
      <h2 className="text-xl font-bold text-white mb-4">Custard CMS</h2>
      {navLinks.map((navLink) => (
        <a
          key={navLink.href}
          href={navLink.href}
          className="text-gray-300 hover:bg-navy-blue hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          {navLink.label}
        </a>
      ))}
    </nav>
  );
}
