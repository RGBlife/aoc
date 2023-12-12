import { readFileSync } from "fs";

const content = readFileSync("../../data/p9-p10_inputs.txt", "utf8");
const sections = content.trim().split("\n\n");
const seedsLine = sections.shift();
const seeds = seedsLine.split(":")[1].trim().split(" ").map(Number);

let lines = content
  .trim()
  .split(/\n/g)
  .map((line) => line.trim());

const maps = getMaps();

function part1(ogSeeds) {
  const seeds = [...ogSeeds];
  sections.forEach((block) => {
    const lines = block.trim().split("\n");
    const ranges = lines.slice(1).map((line) => line.split(" ").map(Number));
    let newSeeds = [];

    seeds.forEach((seed) => {
      let transformed = false;
      for (const [dest, source, range] of ranges) {
        if (source <= seed && seed < source + range) {
          newSeeds.push(seed - source + dest);
          transformed = true;
          break;
        }
      }
      if (!transformed) {
        newSeeds.push(seed);
      }
    });

    seeds.length = 0;
    seeds.push(...newSeeds);
  });

  console.log("Part 1 result:", Math.min(...seeds));
}

function getMaps() {
  const maps = [];
  let currMap = [];

  lines.slice(1).map((line) => {
    if (line !== "") {
      currMap.push(line.split(" ").map(Number));
    } else if (currMap.length > 0) {
      maps.push(currMap);
      currMap = [];
    }
  });

  return [...maps, currMap]
    .filter((map) => map.length > 0)
    .map((map) => map.slice(1));
}

function getDest(seed) {
  let dest = seed;

  for (let j = 0; j < maps.length; j++) {
    const map = maps[j];

    for (let k = 0; k < map.length; k++) {
      const [destStart, sourceStart, rangeLen] = map[k];

      if (dest >= sourceStart && dest < sourceStart + rangeLen) {
        dest = destStart + (dest - sourceStart);
        break;
      }
    }
  }

  return dest;
}

function part2() {
  let min = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < seeds.length; i += 2) {
    let baseSeed = seeds[i];

    for (let j = 0; j < seeds[i + 1]; j++) {
      min = Math.min(min, getDest(baseSeed + j));
    }
  }

  return min;
}

// part 2 results
// Attempt 1 - 184903631 (too high)
// Attempt 2 - 72263011 (correct)

console.log("Part 1 result:", part1());
console.log("Part 2 result:", part2());
