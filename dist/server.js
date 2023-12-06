"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
require("dotenv/config");
const mongoose_1 = require("mongoose");
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT;
let server;
async function main() {
    try {
        const db = await (0, mongoose_1.connect)(process.env.DB_URL, {
            serverSelectionTimeoutMS: 10000, // Increase timeout to 30 seconds
        });
        // Check if the connection is successful
        if (db) {
            server = app_1.default.listen(port, () => {
                console.log(chalk_1.default.bgGreenBright.bold(`Server is running on port: ${port} and connected to the database`));
            });
        }
        else {
            throw new Error("Failed to establish a database connection.");
        }
    }
    catch (error) {
        console.error(chalk_1.default.bgRed.bold("Error connecting to the database:\n", error));
        process.exit(1); // Exit the process with a non-zero status code indicating failure
    }
}
main();
/* caught and handle unhandledRejection for async request*/
process.on("unhandledRejection", () => {
    console.log(`[ unhandledRejection is detected. Server is shutting down . . . ]`);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
        process.exit(1);
    }
});
/*  caught and handle uncaughtException for sync request*/
process.on("uncaughtException", () => {
    console.log(`[ uncaughtException is detected. Server is shutting down . . . ]`);
    process.exit(1);
});
