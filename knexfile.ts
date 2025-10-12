import type { Knex } from "knex";
import {
  DB_DATABASE,
  DB_DSN,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "./configs/config.ts";

const config: Knex.Config = {
  client: "pg",
  connection: {
    connectionString: DB_DSN,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    port: DB_PORT,
  },
  migrations: {
    extension: "ts",
  },
  seeds: {
    directory: "./seeds",
    extension: "ts",
  },
};

export default config;
