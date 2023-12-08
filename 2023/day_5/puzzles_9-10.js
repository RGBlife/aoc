import { log } from "console";
import { readFileSync } from "fs";

const content = readFileSync("../../data/p9-p10_inputs.txt", "utf8");
const sections = content.trim().split("\n\n");
const seedsLine = sections.shift();
const seeds = seedsLine.split(":")[1].trim().split(" ").map(Number);

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

function part2(seeds) {
  let min = 0

  for (let i = 0; i < seeds.length; i += 2) {
    const start = seeds[i];
    const range = seeds[i + 1];

    for (let j = 0; j < range; j++) {
      min = Math.min(min, getLocation(start + j));
    }
  }
  return min;
}

function getLocation(seed) {
  sections.forEach((block) => {
    const lines = block.trim().split("\n");
    const ranges = lines.slice(1).map((line) => line.split(" ").map(Number));

    let transformed = false;
    for (const [dest, source, range] of ranges) {
      if (source <= seed && seed < source + range) {
        return seed - source + dest;
      }
    }
    if (!transformed) {
      return seed;
    }
  });
}

// part1(seeds);
// const seedRanges = getSeedRanges([41218238, 421491713]);
// console.log(seedRanges);
part2(seeds);

// ans 251346198
