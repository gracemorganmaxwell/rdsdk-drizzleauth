import { drizzle } from "drizzle-orm/d1";
import type { users } from "@/db/schema";

type User = typeof users.$inferSelect;

export type AppContext = {
  db: ReturnType<typeof drizzle>;
  user: User | undefined;
};
