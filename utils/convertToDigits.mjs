import fs from "fs";

const validDigits = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

export const convertToDigits = (lines) => {
  const digits = Array.from({ length: lines.length }).map((_) => []);
  for (let i = 0; i < lines.length; i++) {
    for (const key in validDigits) {
      if (lines[i].includes(key)) {
        const index = lines[i].indexOf(key);
        const lastIndex = lines[i].lastIndexOf(key);

        digits[i][index] = validDigits[key];
        digits[i][lastIndex] = validDigits[key];
      }

      if (lines[i].includes(validDigits[key])) {
        const digitIndex = lines[i].indexOf(validDigits[key]);
        const digitLastIndex = lines[i].lastIndexOf(validDigits[key]);

        digits[i][digitIndex] = validDigits[key];
        digits[i][digitLastIndex] = validDigits[key];
      }
    }
  }
  
  return digits;
};

// loop through lines
// [[4,undefined,undefined,undefined,9,1]]
