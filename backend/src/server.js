require("dotenv").config();

const app = require("./app");

const env = require("./config/env");
const { closeDatabase } = require("./config/database");

const server = app.listen(env.PORT, () => {
  console.log(
    `TaskFlow API running on port ${env.PORT}`
  );
});

const shutdown = async (signal) => {
  console.log(`${signal} received. Shutting down...`);

  server.close(async () => {
    try {
      await closeDatabase();

      console.log("Database connection closed");
      process.exit(0);
    } catch (error) {
      console.error(
        "Error during shutdown",
        error
      );

      process.exit(1);
    }
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));

process.on("SIGINT", () => shutdown("SIGINT"));
