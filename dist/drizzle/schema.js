"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.usersTable = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.uuid)("user_id").primaryKey().defaultRandom(),
    fullName: (0, pg_core_1.varchar)('user_name', { length: 255 }).notNull(),
    age: (0, pg_core_1.integer)('age').notNull(),
    email: (0, pg_core_1.varchar)('email', { length: 255 }).notNull().unique(),
    phone: (0, pg_core_1.varchar)('phone', { length: 20 }).notNull(),
    isActive: (0, pg_core_1.boolean)('is_active').default(false),
    gender: (0, pg_core_1.varchar)('gender', { length: 10 }).notNull(),
    address: (0, pg_core_1.jsonb)('address'),
    preferences: (0, pg_core_1.jsonb)('preferences'),
    hobbies: (0, pg_core_1.jsonb)('hobbies'),
    education: (0, pg_core_1.jsonb)('education'),
    socialProfiles: (0, pg_core_1.jsonb)('social_profiles'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
//# sourceMappingURL=schema.js.map