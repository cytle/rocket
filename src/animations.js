function easeInOutExpo({ time, now, total, totalTime }) {
  const t = time / totalTime / 2;
  return t < 1
    ? (2 ** (10 * (t - 1))) * total / 2 + now
    : (2 - 2 ** (-10 * (t - 1))) * total / 2 + now;
}

export {
  easeInOutExpo,
};

export default easeInOutExpo;
