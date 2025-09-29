import env from "dotenv"
env.config()

export const PORT = process.env.PORT || 3000

// DB

export const DB_USER = process.env.MSQL_USER
export const DB_PASSWORD = process.env.MSQL_ROOT_PASSWORD
export const DB_DATABASE = process.env.MSQL_DATABASE