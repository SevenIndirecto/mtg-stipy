function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  //The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateUID(length: number) {
  return Array.from({ length }, () => Math.random().toString(36)[2])
    .join('')
    .toUpperCase();
}

export {
  getRandomIntInclusive,
  generateUID,
};
