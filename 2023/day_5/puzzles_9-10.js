import { readFileSync } from "fs";

const content = readFileSync("../../data/p9-p10_inputs.txt", "utf8");
const sections = content.trim().split("\n\n");
const seedsLine = sections.shift();
const seeds = seedsLine.split(":")[1].trim().split(" ").map(Number);

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
