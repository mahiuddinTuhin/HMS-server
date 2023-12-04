"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
require("dotenv").config();
async function run() {
    // 4. Connect to MongoDB
    try {
        await (0, mongoose_1.connect)(process.env.DB_URL);
        console.log("Connected to db"); // 'bill@initech.com'
    }
    catch (error) {
        console.log("Failed to Connect with db"); // 'bill@initech.com'
    }
}
run().catch((err) => console.log(err));
run();
