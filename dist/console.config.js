"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayLargeText = exports.createBox = void 0;
const chalk_1 = __importDefault(require("chalk"));
// Function to create a box around text
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createBox(text) {
    const boxWidth = text.length + 4; // Box width based on text length
    // Top border
    const topBorder = "╔" + "═".repeat(boxWidth) + "╗";
    // Text with left and right borders
    const borderedText = `║ ${text} ║`;
    // Bottom border
    const bottomBorder = "╚" + "═".repeat(boxWidth) + "╝";
    // Outputting the box
    console.log(chalk_1.default.yellow(topBorder));
    console.log(chalk_1.default.yellow(borderedText));
    console.log(chalk_1.default.yellow(bottomBorder));
}
exports.createBox = createBox;
// Function to display larger text
function displayLargeText(text) {
    const lines = text.split("\n"); // Split text into lines
    // Output each line with increased font size
    for (const line of lines) {
        console.log(chalk_1.default.blueBright.bold(line)); // Using bold and blue color for larger text
    }
}
exports.displayLargeText = displayLargeText;
// Text to display
const text = "Hello, this is larger text!\nIt spans multiple lines!";
// Create a box around the text
createBox(text);
// Display larger text
displayLargeText(text);
