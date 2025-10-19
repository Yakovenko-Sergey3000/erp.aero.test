"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var knex_1 = require("knex");
var config_ts_1 = require("./config.ts");
exports.db = (0, knex_1.default)({
    client: "pg",
    connection: {
        connectionString: config_ts_1.DB_DSN,
    },
    migrations: {
        tableName: "migrations",
    },
});
