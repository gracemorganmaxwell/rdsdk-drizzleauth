// @ts-ignore
import { defineApp } from "rwsdk/worker";
import { index, render, prefix, route } from "rwsdk/router";
import { Document } from "@/app/Document";
import { Home } from "@/app/pages/Home";
import { setCommonHeaders } from "@/app/headers";
import { db } from "@/db";

import AdminDashboardPage from "@/app/pages/admin/AdminDashboardPage";
import NewPostPage from "@/app/pages/admin/posts/NewPostPage";
import PostsPage from "@/app/pages/admin/posts/PostsPage";
import EditPostPage from "@/app/pages/admin/posts/EditPostPage";
import ProjectsPage from "@/app/pages/admin/projects/ProjectsPage";
import NewProjectPage from "@/app/pages/admin/projects/NewProjectPage";
import EditProjectPage from "@/app/pages/admin/projects/EditProjectPage";
import TagsPage from "@/app/pages/admin/tags/TagsPage";
import NewTagPage from "@/app/pages/admin/tags/NewTagPage";
import EditTagPage from "@/app/pages/admin/tags/EditTagPage";
import ImagesPage from "@/app/pages/admin/images/ImagesPage";
import NewImagePage from "@/app/pages/admin/images/NewImagePage";
import EditImagePage from "@/app/pages/admin/images/EditImagePage";

export interface Env {
  DB: D1Database;
}

const isAuthenticated = ({ ctx }: { ctx: any }) => {
  if (!ctx.user) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/user/login" },
    });
  }
};

export default defineApp([
  setCommonHeaders(),
  // Database and user loading with error handling
  render(Document, [
    index(Home),
    prefix("/admin", [
      isAuthenticated as any, // AIDEV-NOTE: Using 'as any' to bypass faulty rwsdk@0.0.80 types.
      async ({ ctx }: { ctx: any }) => {
        ctx.db = db;
        if (process.env.NODE_ENV === "development") {
          try {
            ctx.user = await ctx.db.query.users.findFirst();
          } catch (error) {
            console.error("Dev user mock failed:", error);
            ctx.user = undefined;
          }
        }
      },
      route("/", (requestInfo) => <AdminDashboardPage ctx={requestInfo.ctx} />),
      route("/posts", () => <PostsPage />),
      route("/posts/new", () => <NewPostPage />),
      route("/posts/edit/:id", ({ params }) => (
        <EditPostPage params={params} />
      )),
      route("/projects", () => <ProjectsPage />),
      route("/projects/new", () => <NewProjectPage />),
      route("/projects/edit/:id", ({ params }) => (
        <EditProjectPage params={params} />
      )),
      route("/tags", () => <TagsPage />),
      route("/tags/new", () => <NewTagPage />),
      route("/tags/edit/:id", ({ params }) => <EditTagPage params={params} />),
      route("/images", () => <ImagesPage />),
      route("/images/new", () => <NewImagePage />),
      route("/images/edit/:id", ({ params }) => (
        <EditImagePage params={params} />
      )),
    ]),
  ]),
]);

/* 
 * TEST WORKER COMMENTED OUT:
 * The minimal test Worker is commented below. 
 * It was used to verify deployment—uncomment if needed for further testing.
 * For normal operation, keep it commented and use the full code above.
 */
// export default defineApp([
//   render(Document, [
//     route("/", () => new Response("Test Successful! Your Worker is live and responding.")),
//   ]),
// ]);