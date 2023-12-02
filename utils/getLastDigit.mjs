export const getLastDigit = (line) => {
  if (line.length === 0) return null;

  for (let i = line.length - 1; i >= 0; i--) {
    if (typeof line[i] === "number") {
      return line[i];
    }
  }
};
