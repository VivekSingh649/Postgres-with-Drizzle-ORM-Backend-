import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  schema: './src/drizzle/schema.ts',
  out: './src/drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!
    // host: process.env.PG_HOST as string,
    // port: Number(process.env.PG_PORT),
    // user: process.env.PG_USER as string,
    // password: process.env.PG_PASSWORD as string,
    // database: process.env.PG_DATABASE as string,
    // ssl: {
    //   ca: process.env.PG_CA_CERT as string,
    // }
  }
});

