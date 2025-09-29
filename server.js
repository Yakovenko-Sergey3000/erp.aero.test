import { PORT } from "./configs/config.js";
import "./configs/db.js";
import { db } from "./configs/db.js";
import app from "./app.js";

const startServer = async () => {
  await db.migrate
    .latest()
    .then(() => {
      console.log('✅ All migrations applied"');

      app.listen(PORT, () =>
        console.log(`✅ Server is running on port ${PORT}`),
      );
    })
    .catch((err) => {
      console.log("❌", err);
    });
};

startServer();
