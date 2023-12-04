import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const readTxtFile = (filepath) => {
  const filePath = path.join(__dirname, filepath);
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
};
