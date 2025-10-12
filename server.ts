import { db } from "./configs/db.ts";
import { PORT } from "./configs/config.ts";
import app from "./app.ts";
import "./utils/logger.ts";

/*
  Knex does not have a dedicated method to check the database connection.
  This query verifies the connection status — if the result equals 1,
  it means the connection was established successfully.
*/
const rowKey = "connected";

const startServer = async () => {
  try {
    const connectedDatabase = await db.raw(`SELECT 1 AS ${rowKey}`);

    if (connectedDatabase.rows[0][rowKey] !== 1) {
      throw new Error("Database connection error");
    }

    app.listen(PORT, () => logger.info(`✅ Server is running on port ${PORT}`));
  } catch (err) {
    logger.fatal(err, "❌ Server cannot starting");
  }
};

startServer();
