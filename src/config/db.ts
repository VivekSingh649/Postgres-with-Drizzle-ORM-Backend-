// db.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import dotenv from 'dotenv';
dotenv.config();

// const pool = new Pool({
//   host: process.env.PG_HOST as string,
//   port: Number(process.env.PG_PORT),
//   user: process.env.PG_USER as string,
//   password: process.env.PG_PASSWORD as string,
//   database: process.env.PG_DATABASE as string,
//   // ssl: {
//   //   ca: process.env.PG_CA_CERT as string,
//   //   rejectUnauthorized: true,
//   // }
// });

// const db = drizzle(pool);
const db = drizzle(process.env.DATABASE_URL!);
export default db;