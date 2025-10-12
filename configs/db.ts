import knex from "knex";
import { DB_DSN } from "./config.ts";

export const db = knex({
  client: "pg",
  connection: {
    connectionString: DB_DSN,
  },
  migrations: {
    tableName: "migrations",
  },
});
