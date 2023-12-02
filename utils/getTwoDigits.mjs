export const getTwoDigits = (line) => {
  if (!line) return;

  let count = 0;

  const result = line.map((element) => {
    if (element && count <= 2) {
      count++
      return element;
    }
  });
  return result;
};
