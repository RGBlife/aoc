const getLastDigit = (element) => {
  const digits = element.match(/\d/g);

  if (digits) {
    return digits.length > 1 ? digits[digits.length - 1] : digits[0];
  }
};

module.exports = getLastDigit;
