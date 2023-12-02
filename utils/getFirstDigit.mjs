export const getFirstDigit = (line) => {
  if (line.length === 0) return null;

  for (let i = 0; i < line.length; i++) {
    if (typeof line[i] === "number") {
      return line[i];
    }
  }
};
