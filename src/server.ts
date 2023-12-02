import chalk from "chalk";
import "dotenv/config";
import { connect } from "mongoose";
import app from "./app";
const port = process.env.PORT;

async function main() {
  try {
    const db = await connect(process.env.DB_URL as string, {
      serverSelectionTimeoutMS: 10000, // Increase timeout to 30 seconds
    });

    // Check if the connection is successful
    if (db) {
      app.listen(port, () => {
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
