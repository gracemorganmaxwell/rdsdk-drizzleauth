import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
  index,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

// User model for Gracie (the sole CMS administrator)
export const users = sqliteTable(
  "User",
  {
    id: text("id")
      .notNull()
      .primaryKey()
      .$defaultFn(() => uuidv4()),
    username: text("username").notNull().unique(),
    hashedPassword: text("hashedPassword").notNull(),
    name: text("name"),
    createdAt: integer("createdAt", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer("updatedAt", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
  },
  (table) => [uniqueIndex("User_username_idx").on(table.username)]
);

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  projects: many(projects),
}));

// Model for your reflective blog posts
export const posts = sqliteTable(
  "Post",
  {
    id: text("id")
      .notNull()
      .primaryKey()
      .$defaultFn(() => uuidv4()),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    content: text("content").notNull(),
    excerpt: text("excerpt"),
    bannerImage: text("bannerImage"),
    published: integer("published", { mode: "boolean" })
      .notNull()
      .default(false),
    createdAt: integer("createdAt", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer("updatedAt", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
    authorId: text("authorId").notNull(),
  },
  (table) => [
    uniqueIndex("Post_slug_idx").on(table.slug),
    index("Post_authorId_idx").on(table.authorId),
    index("Post_published_idx").on(table.published),
  ]
);

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  images: many(images),
  tags: many(postTags),
}));

// Model for showcasing your projects
export const projects = sqliteTable(
  "Project",
  {
    id: text("id")
      .notNull()
      .primaryKey()
      .$defaultFn(() => uuidv4()),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description").notNull(),
    content: text("content").notNull(),
    bannerImage: text("bannerImage"),
    featured: integer("featured", { mode: "boolean" }).notNull().default(false),
    githubUrl: text("githubUrl"),
    liveUrl: text("liveUrl"),
    createdAt: integer("createdAt", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer("updatedAt", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
    authorId: text("authorId").notNull(),
    youtubeURL: text("youtubeURL"),
  },
  (table) => [
    uniqueIndex("Project_slug_idx").on(table.slug),
    index("Project_authorId_idx").on(table.authorId),
    index("Project_featured_idx").on(table.featured),
  ]
);

export const projectsRelations = relations(projects, ({ one, many }) => ({
  author: one(users, {
    fields: [projects.authorId],
    references: [users.id],
  }),
  images: many(images),
  tags: many(projectTags),
}));

// Model for images, can be associated with posts or projects
export const images = sqliteTable(
  "Image",
  {
    id: text("id")
      .notNull()
      .primaryKey()
      .$defaultFn(() => uuidv4()),
    filename: text("filename").notNull(),
    url: text("url").notNull(),
    alt: text("alt"),
    caption: text("caption"),
    createdAt: integer("createdAt", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
    postId: text("postId"),
    projectId: text("projectId"),
  },
  (table) => [
    index("Image_postId_idx").on(table.postId),
    index("Image_projectId_idx").on(table.projectId),
    index("Image_filename_idx").on(table.filename),
  ]
);

export const imagesRelations = relations(images, ({ one }) => ({
  post: one(posts, {
    fields: [images.postId],
    references: [posts.id],
  }),
  project: one(projects, {
    fields: [images.projectId],
    references: [projects.id],
  }),
}));

// Model for categorization and filtering of posts and projects
export const tags = sqliteTable(
  "Tag",
  {
    id: text("id")
      .notNull()
      .primaryKey()
      .$defaultFn(() => uuidv4()),
    name: text("name").notNull().unique(),
    description: text("description"),
    color: text("color"),
    createdAt: integer("createdAt", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer("updatedAt", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
  },
  (table) => [uniqueIndex("Tag_name_idx").on(table.name)]
);

export const tagsRelations = relations(tags, ({ many }) => ({
  posts: many(postTags),
  projects: many(projectTags),
}));

// Junction table for the many-to-many relationship between Posts and Tags
export const postTags = sqliteTable(
  "PostTag",
  {
    postId: text("postId")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    tagId: text("tagId")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({ columns: [table.postId, table.tagId] }),
    index("PostTag_postId_idx").on(table.postId),
    index("PostTag_tagId_idx").on(table.tagId),
  ]
);

export const postTagsRelations = relations(postTags, ({ one }) => ({
  post: one(posts, {
    fields: [postTags.postId],
    references: [posts.id],
  }),
  tag: one(tags, {
    fields: [postTags.tagId],
    references: [tags.id],
  }),
}));

// Junction table for the many-to-many relationship between Projects and Tags
export const projectTags = sqliteTable(
  "ProjectTag",
  {
    projectId: text("projectId")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    tagId: text("tagId")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({ columns: [table.projectId, table.tagId] }),
    index("ProjectTag_projectId_idx").on(table.projectId),
    index("ProjectTag_tagId_idx").on(table.tagId),
  ]
);

export const projectTagsRelations = relations(projectTags, ({ one }) => ({
  project: one(projects, {
    fields: [projectTags.projectId],
    references: [projects.id],
  }),
  tag: one(tags, {
    fields: [projectTags.tagId],
    references: [tags.id],
  }),
}));
