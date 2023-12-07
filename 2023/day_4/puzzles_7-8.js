import { readFileSync } from "fs";

const testInput = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

// output 13

const content = readFileSync("../../data/p7-p8_inputs.txt", "utf8");
const cards = content.trim().split("\n");
const results = [];

cards.forEach((card, i) => {
  let points = 0;
  const [leftSide, rightSide] = card.split(":")[1].split("|");
  const winningNumbers = leftSide.trim().split(" ").map(Number);
  const numbersPlayed = rightSide.trim().split(/\s+/).map(Number);

  winningNumbers.forEach((number) => {
    if (numbersPlayed.includes(number) && points === 0) {
      points = 1;
    } else if (numbersPlayed.includes(number) && points > 0) {
      points = points * 2;
    }
  });

  results.push(points);
});
console.log(
  "Part 1 result:",
  results.reduce((acc, cur) => acc + cur)
);

// Attempt 1 - 204740 (too high)
// Attempt 2 - 50811 (too high)
// Attempt 3 - 21919 (correct)

// steps
// parse input into array of cards
// parse cards into two sections, winning numbers and numbers played
// parse numbers played into winning numbers
// first count is 1 point, anything after that is doubled
// once collected all the points, sum them up and return the total
