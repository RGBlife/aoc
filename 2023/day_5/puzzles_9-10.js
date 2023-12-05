import { readFileSync } from "fs";

const lines = readFileSync("data/p9-p10.inputs.txt")
  .toString()
  .trim()
  .split("\n");

const testInputs = {
  example: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
};

let { example } = testInputs;
// const lines = example.toString().trim().split("\n");

const seeds = getSeeds(lines);
const seedToSoil = getMap(lines, "seed-to-soil map:");
const soilToFertilizer = getMap(lines, "soil-to-fertilizer map:");
const fertilizerToWater = getMap(lines, "fertilizer-to-water map:");
const waterToLight = getMap(lines, "water-to-light map:");
const lightToTemperature = getMap(lines, "light-to-temperature map:");
const temperatureToHumidity = getMap(lines, "temperature-to-humidity map:");
const humidityToLocation = getMap(lines, "humidity-to-location map:");

function getSeeds(lines) {
  const seeds = lines[0].split(":")[1].trim().split(" ").map(Number);
  return seeds;
}

function getMap(lines, mapName) {
  const map = lines
    .slice(
      lines.findIndex((line) => line.includes(mapName)) + 1,
      lines.findIndex((line) => line.includes(mapName)) + 4
    )
    .map((line) => line.trim().split(" ").map(Number));
  return map;
}

function part1(seeds) {
  const outputs = {
    "seed-to-soil": [],
    "soil-to-fertilizer": [],
    "fertilizer-to-water": [],
    "water-to-light": [],
    "light-to-temperature": [],
    "temperature-to-humidity": [],
    "humidity-to-location": [],
  };

  seeds.forEach((seed) => {
    outputs["seed-to-soil"].push(process(seedToSoil, seed));
  });

  console.log("new map:");

  outputs["seed-to-soil"].forEach((soil) => {
    outputs["soil-to-fertilizer"].push(process(soilToFertilizer, soil));
  });

  console.log("new map:");

  outputs["soil-to-fertilizer"].forEach((fertilizer) => {
    outputs["fertilizer-to-water"].push(process(fertilizerToWater, fertilizer));
  });

  console.log("new map:");

  outputs["fertilizer-to-water"].forEach((water) => {
    outputs["water-to-light"].push(process(waterToLight, water));
  });

  console.log("new map:");

  outputs["water-to-light"].forEach((light) => {
    outputs["light-to-temperature"].push(process(lightToTemperature, light));
  });

  console.log("new map:");

  outputs["light-to-temperature"].forEach((temperature) => {
    outputs["temperature-to-humidity"].push(
      process(temperatureToHumidity, temperature)
    );
  });

  console.log("new map:");

  outputs["temperature-to-humidity"].forEach((humidity) => {
    outputs["humidity-to-location"].push(process(humidityToLocation, humidity));
  });

  let lowestLocation = Infinity;

  outputs["humidity-to-location"].forEach((location) => {
    lowestLocation = Math.min(lowestLocation, location);
  });

  console.log(outputs);
  console.log("results:", lowestLocation);
}

// 22914234 Too low

function process(map, seed) {
  let match = false;
  

  for (let i = 0; i < map.length; i++) {
    if (seed > map[i][1] && seed <= map[i][1] + map[i][2] - 1) {
        console.log("seed ", seed, " maps to ", map[i][0] + seed - map[i][1]);
      const diff = seed - map[i][1];
      match = true;
      return map[i][0] + diff;
    }
  }
  if (!match) {
    console.log("seed ", seed, " maps to ", seed);
    return seed;
  }
}

part1(seeds);

// destination range start, a source range start, and a range length

// 79
// 52 50 48 (range from 52 to 98)
// 79 falls into range, calculate the difference between 79 and 50 which is 29
// add 29 to 52 = 81
// seed 79 maps to 81 soil
