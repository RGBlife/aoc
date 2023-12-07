import { readFileSync } from "fs";

// part 1 - steps
// parse input into array of cards
// parse cards into two sections, winning numbers and numbers played
// parse numbers played into winning numbers
// first count is 1 point, anything after that is doubled
// once collected all the points, sum them up and return the total

const testInput = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

// output 13

const content = readFileSync("../../data/p7-p8_inputs.txt", "utf8");
const cards = content.trim().split("\n");
let results = [];

function part1(cards) {
  cards.forEach((card) => {
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
  return results.reduce((acc, cur) => acc + cur);
}
// console.log("Part 1 result:", part1(cards));

// Attempt 1 - 204740 (too high)
// Attempt 2 - 50811 (too high)
// Attempt 3 - 21919 (correct)

// Part 2 - Steps
// 1. Maintain a tally (count) of each card's copies using an object. This object will map a card's identifier to the number of its copies.
// 2. Loop through each card. For each card, check the number of winning numbers it has.
// 3. For card, check the tally to see how many copies of this card exist.
//    - If there are multiple copies (e.g., 3 copies), add the original count plus 1 to the tally of the subsequent cards based on the number of winning numbers.
// 4. After processing all cards, sum up all the counts in the tally and return.

const testInput2 = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

function part2(cards) {
  const tally = {};
  cards.forEach((card) => {
    let wins = 0;
    const [leftSide, rightSide] = card.split(":")[1].split("|");
    const cardNumber = Number(card.split(":")[0].split(/\s+/)[1]);
    const winningNumbers = leftSide.trim().split(" ").map(Number);
    const numbersPlayed = rightSide.trim().split(/\s+/).map(Number);

    winningNumbers.forEach((number) => {
      if (numbersPlayed.includes(number)) {
        wins += 1;
      }
    });

    if (!tally[cardNumber]) {
      tally[cardNumber] = 1;
    }

    if (wins) {
      for (
        let i = cardNumber + 1;
        i <= Math.min(cardNumber + wins, cards.length);
        i++
      ) {
        tally[i] = tally[i]
          ? tally[i] + tally[cardNumber]
          : 1 + tally[cardNumber];
      }
    }
  });
  return Object.values(tally).reduce((acc, cur) => acc + cur);
}

// Attempt 1 - 5075055 (too low)
// attempt 2 - 211153 (too low)
// attempt 3 - 13364591 (too high)
// attempt 4 - 9881048 (correct)

console.log("Part 2 result:", part2(cards));
