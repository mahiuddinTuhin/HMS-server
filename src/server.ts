import chalk from "chalk";
import "dotenv/config";
import { Server } from "http";
import { connect } from "mongoose";
import app from "./app";
import config from "./app/config";
const port = process.env.PORT;

let server: Server;

async function main() {
  try {
    const db = await connect(config.DB_URL_ATLAS as string, {
      serverSelectionTimeoutMS: 10000, // Increase timeout to 30 seconds
    });

    // Check if the connection is successful
    if (db) {
      server = app.listen(port, () => {
        // console.log(config.DB_URL_COMPASS);
        console.log(
          chalk.bgGreenBright.bold(
            `Server is running on port: ${port} and connected to the database`,
          ),
        );
      });
    } else {
      throw new Error("Failed to establish a database connection.");
    }
  } catch (error) {
    console.error(
      chalk.bgRed.bold("Error connecting to the database:\n", error),
    );
    process.exit(1); // Exit the process with a non-zero status code indicating failure
  }
}

main();

/* caught and handle unhandledRejection for async request*/

process.on("unhandledRejection", () => {
  console.log(
    `[ unhandledRejection is detected. Server is shutting down . . . ]`,
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
    process.exit(1);
  }
});

/*  caught and handle uncaughtException for sync request*/
process.on("uncaughtException", () => {
  console.log(
    `[ uncaughtException is detected. Server is shutting down . . . ]`,
  );

  process.exit(1);
});
