import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "inputs.txt");

const allocatedCubes = {
  red: 12,
  green: 13,
  blue: 14,
};

function readTxtFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, fileContents) => {
      if (err) {
        reject("Error reading file: " + err);
      } else {
        const lines = fileContents.split(/\r?\n/);
        resolve(lines);
      }
    });
  });
}

async function checkPossibleGames() {
  const rawTxtList = await readTxtFile();
  const listOfGames = getListOfGames(rawTxtList);

  const possibleGamesIds = [];

  listOfGames.forEach((game) => {
    Object.entries(game).forEach(([gameId, plays]) => {
      if (!isGameImpossible(plays)) {
        possibleGamesIds.push(gameId);
      }
    });
  });

  const sum = possibleGamesIds.reduce((acc, cur) => {
    return acc + parseInt(cur);
  }, 0);

  return sum;
}

function getListOfGames(txtList) {
  const listOfGames = txtList.map((game, i) => {
    const gameSplit = game.split(":");
    const key = gameSplit[0].substring(5).trim();
    const value = gameSplit[1].trim().split("; ");

    const obj = {};
    obj[key] = value;
    return obj;
  });
  return listOfGames;
}

function isGameImpossible(plays) {
  return plays.some((play) => isPlayImpossible(play));
}

function isPlayImpossible(play) {
  const cubes = play.split(", ");
  return cubes.some((cube) => {
    const [number, colour] = cube.split(" ");
    return parseInt(number, 10) > allocatedCubes[colour];
  });
}

checkPossibleGames().then((res) => console.log(res));
