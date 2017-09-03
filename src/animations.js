function easeInOutExpo({ time, now, total, totalTime }) {
  time /= totalTime / 2;
  return time < 1
    ? total / 2 * Math.pow(2, 10 * (time - 1)) + now
    : total / 2 * (-Math.pow(2, -10 * (time - 1)) + 2) + now;
}

export {
  easeInOutExpo,
};

export default easeInOutExpo;
