import knex from "knex";
import { DB_DATABASE, DB_PASSWORD, DB_USER } from "./config.js";

export const db = knex({
  client: "mysql2",
  connection: {
    host: "localhost",
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
  },
  migrations: {
    tableName: "migrations",
  },
});
