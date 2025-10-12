import env from "dotenv";
env.config();

export const PORT = Number(process.env.PORT) || 3000;

// DB

export const DB_USER = String(process.env.DB_USER);
export const DB_PASSWORD = String(process.env.DB_PASSWORD);
export const DB_DATABASE = String(process.env.DB_DATABASE);
export const DB_DSN = String(process.env.DB_DSN);
export const DB_HOST = String(process.env.DB_HOST);
export const DB_PORT = Number(process.env.DB_PORT);

// JWT
export const JWT_ACCESS_SECRET = String(process.env.JWT_ACCESS_SECRET);
export const JWT_REFRESH_SECRET = String(process.env.JWT_REFRESH_SECRET);
