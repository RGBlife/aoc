import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "inputs.txt");

const compareCubes = {
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

  let count = {
    red: 0,
    green: 0,
    blue: 0,
  };

  for (let i = 0; i < listOfGames.length; i++) {
    for (const key in listOfGames[i]) {
      const value = listOfGames[i][key];

      value.forEach((play) => {
        const playSplit = play.split(", ");
        count = {
          red: 0,
          green: 0,
          blue: 0,
        };

        playSplit.forEach((play) => {
          const [number, colour] = play.split(" ");
          if (count.hasOwnProperty(colour)) {
            count[colour] += parseInt(number, 10);
          }
        });

        // create functions for above
        // compare count to compareCubes
        // if less or equal, add ID to possibleGamesIds
        // if not, continue
        // at the end, sum possibleGamesIds and return

      });
    }
  }
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

checkPossibleGames().then((res) => console.log("hey"));
