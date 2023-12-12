import { readFileSync } from "fs";

const testData = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const content = readFileSync("data/day_7_inputs.txt", "utf8");
// const content = testData;
const input = content
  .split("\n")
  .map((line) => line.split(" "))
  .map((value) => [value[0], parseInt(value[1])]);

const cardMap = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const cardMapPt2 = {
  J: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  Q: 11,
  K: 12,
  A: 13,
};

const fiveOfAKind = [];
const fourOfAKind = [];
const fullHouse = [];
const threeOfAKind = [];
const twoPairs = [];
const onePair = [];
const highCard = [];

function part1() {
  for (const line of input) {
    const chars = {};

    for (const char of line[0]) {
      chars[char] == undefined ? (chars[char] = 1) : chars[char]++;
    }
    const keys = Object.keys(chars);
    const values = Object.values(chars);

    if (keys.length == 1) fiveOfAKind.push(line);
    else if (keys.length == 2) {
      if (values.includes(4)) fourOfAKind.push(line);
      else fullHouse.push(line);
    } else if (keys.length == 3) {
      if (values.includes(3)) threeOfAKind.push(line);
      else twoPairs.push(line);
    } else if (keys.length == 4) onePair.push(line);
    else highCard.push(line);
  }

  function sortCards(a, b) {
    if (cardMap[a[0][0]] != cardMap[b[0][0]])
      return cardMap[a[0][0]] - cardMap[b[0][0]];
    else if (cardMap[a[0][1]] != cardMap[b[0][1]])
      return cardMap[a[0][1]] - cardMap[b[0][1]];
    else if (cardMap[a[0][2]] != cardMap[b[0][2]])
      return cardMap[a[0][2]] - cardMap[b[0][2]];
    else if (cardMap[a[0][3]] != cardMap[b[0][3]])
      return cardMap[a[0][3]] - cardMap[b[0][3]];
    else if (cardMap[a[0][4]] != cardMap[b[0][4]])
      return cardMap[a[0][4]] - cardMap[b[0][4]];
    else return 0;
  }

  fiveOfAKind.sort(sortCards);
  fourOfAKind.sort(sortCards);
  fullHouse.sort(sortCards);
  threeOfAKind.sort(sortCards);
  twoPairs.sort(sortCards);
  onePair.sort(sortCards);
  highCard.sort(sortCards);

  const resultArray = [
    ...highCard,
    ...onePair,
    ...twoPairs,
    ...threeOfAKind,
    ...fullHouse,
    ...fourOfAKind,
    ...fiveOfAKind,
  ];

  return resultArray.reduce(
    (accu, hand, rank) => accu + hand[1] * (rank + 1),
    0
  );
}

function part2() {
  for (const line of input) {
    const chars = {};

    for (const char of line[0]) {
      chars[char] == undefined ? (chars[char] = 1) : chars[char]++;
    }
    let keys = Object.keys(chars);
    let values = Object.values(chars);

    if (chars["J"] < 5) {
      const max = Math.max(...Object.values({ ...chars, J: 0 }));

      chars[
        keys[values.findIndex((value, i) => value == max && keys[i] != "J")]
      ] += chars["J"];

      delete chars["J"];

      keys = Object.keys(chars);
      values = Object.values(chars);
    }

    switch (keys.length) {
      case 1:
        fiveOfAKind.push(line);
        break;
      case 2:
        values.includes(4) ? fourOfAKind.push(line) : fullHouse.push(line);
        break;
      case 3:
        values.includes(3) ? threeOfAKind.push(line) : twoPairs.push(line);
        break;
      case 4:
        onePair.push(line);
        break;
      default:
        highCard.push(line);
        break;
    }
  }

  function sortCards(a, b) {
    for (let i = 0; i < a[0].length; i++) {
      const difference = cardMapPt2[a[0][i]] - cardMapPt2[b[0][i]];
      if (difference !== 0) {
        return difference;
      }
    }
    return 0;
  }

  fiveOfAKind.sort(sortCards);
  fourOfAKind.sort(sortCards);
  fullHouse.sort(sortCards);
  threeOfAKind.sort(sortCards);
  twoPairs.sort(sortCards);
  onePair.sort(sortCards);
  highCard.sort(sortCards);

  const resultArray = [
    ...highCard,
    ...onePair,
    ...twoPairs,
    ...threeOfAKind,
    ...fullHouse,
    ...fourOfAKind,
    ...fiveOfAKind,
  ];

  return resultArray.reduce(
    (accu, hand, rank) => accu + hand[1] * (rank + 1),
    0
  );
}

// console.log("part 1 result:", part1());
console.log("part 2 result:", part2());

// Part 2
// Attempt 1 - 1001323671 (too high)
// Attempt 2 - 249781879 (correct)
