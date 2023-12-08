import { readFileSync } from "fs";
const testDate = `Time:      7  15   30
    Distance:  9  40  200`;

const content = readFileSync("../../data/day_6_Inputs.txt", "utf8");
// const content = testDate;
const sections = content.trim().split("\n");
const times = sections[0].split(":")[1].trim().split(/\s+/).map(Number);
const distances = sections[1].split(":")[1].trim().split(/\s+/).map(Number);

// steps
// first example time 7, distance 9
// start off with button pushed for 1 millisecond, 7-1 = 6 milliseconds to travel at 1 millimeter per millisecond
// 6 * 1 = 6 millimeters traveled < 9 millimeters, push for another millisecond until millimeters traveled > 9
// once further, increment race wins by 1
// after completing all the possibilities for a race, push the wins into an array
// repeat this for each time and distance
// multiply each num in the resulting array and return

function part1() {
  let winsByRace = [];

  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const recordDistance = distances[i];
    let wins = 0;

    for (let j = 0; j < time; j++) {
      let timeleft = +(time - j);
      const disTraveled = j * timeleft;

      if (disTraveled > recordDistance) {
        wins++;
      }
    }
    winsByRace.push(wins);
  }

  return winsByRace.reduce((acc, curr) => acc * curr);
}

console.log("part 1 result:", part1());

// Attempt 1 - 393120 (correct)
