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
async function main() {
    try {
        await (0, mongoose_1.connect)(process.env.DB_URL);
        app_1.default.listen(port, () => {
            console.log(chalk_1.default.bgGreenBright.bold(`              server is runnign in port: ${port} and Connected to db               `));
        });
    }
    catch (error) {
        console.log(error);
    }
}
main();
// export default app;
