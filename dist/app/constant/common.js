"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateRegex = void 0;
const currentYear = new Date().getFullYear(); // Get the current year dynamically
exports.dateRegex = new RegExp(`^(${currentYear}|${currentYear + 1})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$`);
