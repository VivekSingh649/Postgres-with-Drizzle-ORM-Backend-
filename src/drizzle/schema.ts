import { boolean, integer, jsonb, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("user_id").primaryKey().defaultRandom(),
  fullName: varchar('user_name', { length: 255 }).notNull(),
  age: integer('age').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }).notNull(),
  isActive: boolean('is_active').default(false),
  gender: varchar('gender', { length: 10 }).notNull(),
  address: jsonb('address'),
  preferences: jsonb('preferences'),
  hobbies: jsonb('hobbies'),
  education: jsonb('education'),
  socialProfiles: jsonb('social_profiles'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});