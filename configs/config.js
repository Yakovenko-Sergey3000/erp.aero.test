import env from "dotenv";
env.config();

export const PORT = process.env.PORT || 3000;

// DB

export const DB_USER = process.env.MSQL_USER;
export const DB_PASSWORD = process.env.MSQL_ROOT_PASSWORD;
export const DB_DATABASE = process.env.MSQL_DATABASE;

// JWT
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
