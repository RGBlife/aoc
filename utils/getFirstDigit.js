const getFirstDigit = (element) => {
  const digits = element.match(/\d/);
  return digits ? digits[0] : NaN;
};

module.exports = getFirstDigit;
