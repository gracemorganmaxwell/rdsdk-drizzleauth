import { defineScript } from 'rwsdk/worker'; // Required for rwsdk script execution in Worker context
import { drizzle } from 'drizzle-orm/d1'; // The Drizzle driver for Cloudflare D1
import { users } from './schema'; // Your Drizzle schema for the User table
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
import bcrypt from 'bcryptjs'; // For hashing passwords

// This script is designed to run within the Cloudflare Worker environment,
// which is provided by `rwsdk`'s `worker:run` command.
export default defineScript(async ({ env }) => {
  // It's good practice to check if the D1 binding is available.
  // In `worker:run` or deployed Worker, `env.DB` should be present.
  if (!env.DB) {
    console.error('ERROR: D1 database binding (env.DB) not found!');
    return new Response('ERROR: D1 database binding not found!', { status: 500 });
  }

  // Initialize Drizzle ORM with the D1 database binding.
  const db = drizzle(env.DB);

  console.log('🌱 Starting seed script...');

  try {
    // --- Optional: Clear existing user data for a fresh seed ---
    console.log('Clearing existing user data...');
    // Be very careful with this line if this targets your production DB directly!
    await db.delete(users).execute();
    console.log('Existing user data cleared.');
    // -----------------------------------------------------------

    // Hash a dummy password securely.
    // IMPORTANT: Change 'password123' to a strong, unique password for any actual use.
    const hashedPassword = await bcrypt.hash('password123', 10); // 10 is a good default for salt rounds

    // Generate a UUID for the new user's ID.
    const newUserId = uuidv4();

    // Insert the new user into the 'users' table.
    console.log('Inserting new user...');
    await db.insert(users).values({
      id: newUserId,
      username: 'gracie_admin', // Your login username
      hashedPassword: hashedPassword,
      name: 'Gracie Admin', // Your display name
      createdAt: new Date(), // Drizzle handles conversion to timestamp for SQLite integer
      updatedAt: new Date(), // Drizzle handles conversion to timestamp for SQLite integer
    });
    console.log('User inserted successfully.');

    // Verify the insertion by selecting all users from the database.
    console.log('Verifying inserted user...');
    const result = await db.select().from(users).all();

    console.log('🌱 Finished seeding. Users currently in DB:');
    console.log(result);

    // Return a JSON response, typical for Worker scripts.
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Basic error handling for the script.
    console.error('Seed script failed:', error);
    return new Response(`Seed script failed: ${error}`, { status: 500 });
  }
});