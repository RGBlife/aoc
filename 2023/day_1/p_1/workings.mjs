import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { convertToDigits } from "../../utils/convertToDigits.mjs";
import { getFirstDigit } from "../../utils/getFirstDigit.mjs";
import { getLastDigit } from "../../utils/getLastDigit.mjs";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "inputs.txt");

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

async function getDigits() {
  try {
    const allLines = await readTxtFile();
    const formattedLines = convertToDigits(allLines);

    const doubleDigits = formattedLines.map((line) => {
      const firstDigit = getFirstDigit(line);
      const lastDigit = getLastDigit(line);

      let con = 0;

      if (firstDigit) {
        con = String(firstDigit) + String(lastDigit);
      }

      console.log(con);

      return con;
    });

    const doubleDigitSum = doubleDigits.reduce((acc, cur) => {
      return acc + parseInt(cur);
    }, 0);

    return doubleDigitSum;
  } catch (error) {
    console.error("error with getDigits", error);
  }
}

getDigits().then((res) => console.log(res));
