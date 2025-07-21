ALTER TABLE `users` RENAME TO `User`;--> statement-breakpoint
ALTER TABLE `User` RENAME COLUMN "email" TO "username";--> statement-breakpoint
CREATE TABLE `Image` (
	`id` text PRIMARY KEY NOT NULL,
	`filename` text NOT NULL,
	`url` text NOT NULL,
	`alt` text,
	`caption` text,
	`createdAt` integer NOT NULL,
	`postId` text,
	`projectId` text
);
--> statement-breakpoint
CREATE INDEX `Image_postId_idx` ON `Image` (`postId`);--> statement-breakpoint
CREATE INDEX `Image_projectId_idx` ON `Image` (`projectId`);--> statement-breakpoint
CREATE INDEX `Image_filename_idx` ON `Image` (`filename`);--> statement-breakpoint
CREATE TABLE `PostTag` (
	`postId` text NOT NULL,
	`tagId` text NOT NULL,
	PRIMARY KEY(`postId`, `tagId`),
	FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `PostTag_postId_idx` ON `PostTag` (`postId`);--> statement-breakpoint
CREATE INDEX `PostTag_tagId_idx` ON `PostTag` (`tagId`);--> statement-breakpoint
CREATE TABLE `Post` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`content` text NOT NULL,
	`excerpt` text,
	`bannerImage` text,
	`published` integer DEFAULT false NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	`authorId` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Post_slug_unique` ON `Post` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `Post_slug_idx` ON `Post` (`slug`);--> statement-breakpoint
CREATE INDEX `Post_authorId_idx` ON `Post` (`authorId`);--> statement-breakpoint
CREATE INDEX `Post_published_idx` ON `Post` (`published`);--> statement-breakpoint
CREATE TABLE `ProjectTag` (
	`projectId` text NOT NULL,
	`tagId` text NOT NULL,
	PRIMARY KEY(`projectId`, `tagId`),
	FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `ProjectTag_projectId_idx` ON `ProjectTag` (`projectId`);--> statement-breakpoint
CREATE INDEX `ProjectTag_tagId_idx` ON `ProjectTag` (`tagId`);--> statement-breakpoint
CREATE TABLE `Project` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`description` text NOT NULL,
	`content` text NOT NULL,
	`bannerImage` text,
	`featured` integer DEFAULT false NOT NULL,
	`githubUrl` text,
	`liveUrl` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	`authorId` text NOT NULL,
	`youtubeURL` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Project_slug_unique` ON `Project` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `Project_slug_idx` ON `Project` (`slug`);--> statement-breakpoint
CREATE INDEX `Project_authorId_idx` ON `Project` (`authorId`);--> statement-breakpoint
CREATE INDEX `Project_featured_idx` ON `Project` (`featured`);--> statement-breakpoint
CREATE TABLE `Tag` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`color` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Tag_name_unique` ON `Tag` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `Tag_name_idx` ON `Tag` (`name`);--> statement-breakpoint
DROP INDEX `users_email_unique`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_User` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`hashedPassword` text NOT NULL,
	`name` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_User`("id", "username", "hashedPassword", "name", "createdAt", "updatedAt") SELECT "id", "username", "hashedPassword", "name", "createdAt", "updatedAt" FROM `User`;--> statement-breakpoint
DROP TABLE `User`;--> statement-breakpoint
ALTER TABLE `__new_User` RENAME TO `User`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `User_username_unique` ON `User` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `User_username_idx` ON `User` (`username`);