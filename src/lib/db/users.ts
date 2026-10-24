import { db } from ".";
import { users } from "./schema";
import { eq, sql } from 'drizzle-orm';

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function selectUser(name: string) {
  const [result] = await db.select().from(users).where(eq(users.name, name));

  return result;
}

export async function resetDB() {
  return await db.execute(sql`TRUNCATE TABLE users CASCADE`)
}

export async function getUsers() {
  const result = await db.select({name: users.name}).from(users);
  return result;
}