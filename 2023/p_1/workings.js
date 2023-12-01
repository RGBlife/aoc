const fs = require("fs");
const path = require("path");
const getFirstDigit = require("../../utils/getFirstDigit");
const getLastDigit = require("../../utils/getLastDigit");

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
    const digits = await readTxtFile();
    const doubleDigits = digits.map((line) => {
      const firstDigit = getFirstDigit(line);
      const lastDigit = getLastDigit(line);

      let con = 0;

      if (firstDigit) {
        con = lastDigit ? firstDigit + lastDigit : firstDigit;
      }
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
