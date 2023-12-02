"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFruit = void 0;
// src/index.ts
const favoriteFruits = [
    "apple",
    "2",
    "strawberry",
    "strawberry",
    "orange",
];
function addFruit(fruit) {
    favoriteFruits.push(fruit);
}
exports.addFruit = addFruit;
