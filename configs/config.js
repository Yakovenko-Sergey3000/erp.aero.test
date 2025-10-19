"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_REFRESH_SECRET = exports.JWT_ACCESS_SECRET = exports.DB_PORT = exports.DB_HOST = exports.DB_DSN = exports.DB_DATABASE = exports.DB_PASSWORD = exports.DB_USER = exports.PORT = void 0;
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
exports.PORT = Number(process.env.PORT) || 3000;
// DB
exports.DB_USER = String(process.env.DB_USER);
exports.DB_PASSWORD = String(process.env.DB_PASSWORD);
exports.DB_DATABASE = String(process.env.DB_DATABASE);
exports.DB_DSN = String(process.env.DB_DSN);
exports.DB_HOST = String(process.env.DB_HOST);
exports.DB_PORT = Number(process.env.DB_PORT);
// JWT
exports.JWT_ACCESS_SECRET = String(process.env.JWT_ACCESS_SECRET);
exports.JWT_REFRESH_SECRET = String(process.env.JWT_REFRESH_SECRET);
