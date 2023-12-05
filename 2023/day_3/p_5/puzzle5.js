import { readFileSync } from "fs";

class Grid {
  constructor() {
    this.data = new Map();
  }

  add(pos, val) {
    this.data.set(`${pos.x},${pos.y}`, { value: val, pos });
  }

  get(pos) {
    return this.data.get(`${pos.x},${pos.y}`);
  }

  forEach(cb) {
    this.data.forEach(cb);
  }
}

const boundary = (cell, width) => ({
  min: { x: cell.x - 1, y: cell.y - 1 },
  max: { x: cell.x + width, y: cell.y + 1 },
});
const within = (cell, boundary) =>
  cell.x >= boundary.min.x &&
  cell.y >= boundary.min.y &&
  cell.x <= boundary.max.x &&
  cell.y <= boundary.max.y;
const isNumberInRange = (number, min, max) => number >= min && number <= max;
const isDigit = (character) => {
  const charCodeOffset = character.charCodeAt(0) - "0".charCodeAt(0);
  return isNumberInRange(charCodeOffset, 0, 9);
};

function parseGrid(lines) {
  const nums = new Grid();
  const symbols = new Grid();

  lines.forEach((line, y) => {
    let numStr = "",
      numX = -1;
    for (let x = 0; x < line.length; x++) {
      const ch = line.charAt(x);
      if (ch === ".") {
        // empty
      } else if (isDigit(ch)) {
        numStr += ch;
        numX = numX === -1 ? x : numX;
        if (x < line.length - 1) {
          continue;
        }
      } else {
        symbols.add({ x, y }, ch);
      }

      if (numStr.length > 0) {
        nums.add({ x: numX, y }, parseInt(numStr));
        numStr = "";
        numX = -1;
      }
    }
  });
  return { nums, symbols };
}

function part1(lines) {
  const { nums, symbols } = parseGrid(lines);
  const result = findParts(nums, symbols).reduce((acc, cur) => acc + cur, 0);
  console.log(`Part 1: ${result}`);
}

function findParts(nums, symbols) {
  const parts = [];
  nums.forEach((num) => {
    symbols.forEach((symbol) => {
      if (within(symbol.pos, boundary(num.pos, num.value.toString().length))) {
        parts.push(num.value);
      }
    });
  });
  return parts;
}

function part2(lines) {
  let result = 0;
  const { nums, symbols } = parseGrid(lines);
  const parts = findParts(nums, symbols);
  symbols.forEach((symbol) => {
    const adjacent = [];
    nums.forEach((num) => {
      if (parts.includes(num.value)) {
        if (
          within(symbol.pos, boundary(num.pos, num.value.toString().length))
        ) {
          adjacent.push(num.value);
        }
      }
    });
    if (adjacent.length === 2) {
      result += adjacent[0] * adjacent[1];
    }
  });
  console.log(`Part 2: ${result}`);
}

const lines = readFileSync("data/p5-p6_inputs").toString().trim().split("\n");
part1(lines);
part2(lines);
