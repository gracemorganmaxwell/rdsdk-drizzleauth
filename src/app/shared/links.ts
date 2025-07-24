import { defineLinks } from "rwsdk/router";

export const link = defineLinks([
  "/",
  "/user/login",
  "/user/signup",
  "/user/logout",
  "/legal/privacy",
  "/legal/terms",

  // Admin Links
  "/admin",
  "/admin/posts",
  "/admin/posts/new",
  "/admin/posts/edit/:id",
  "/admin/projects",
  "/admin/projects/new",
  "/admin/projects/edit/:id",
  "/admin/tags",
  "/admin/tags/new",
  "/admin/tags/edit/:id",
  "/admin/images",
  "/admin/images/new",
  "/admin/images/edit/:id",
]);
