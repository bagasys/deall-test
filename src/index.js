const app = require("./app");
const config = require("./config/config");
const mongoose = require("mongoose");

let server;

async function start() {
  let db_connected = false;
  while (!db_connected) {
    try {
      await mongoose.connect(config.mongoose.url, config.mongoose.options);
      db_connected = true;
    } catch {
      console.log("Error connecting to MongoDB, retrying in 1 second");
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  server = app.listen(config.port, () => {
    console.log(
      `server is running on PORT ${config.port} in ${config.env} env`,
      config.mongoose.url
    );
  });
}

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});

start();
