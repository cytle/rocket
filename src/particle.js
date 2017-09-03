export default class Particle {
  constructor({
    x,
    y,
    fillStyle,
    size,
    start,
    delay,
    offset,
  }) {
    this.x = start.x;
    this.y = start.y;
    this.targetX = x;
    this.targetY = y;
    this.offsetX = x - start.x;
    this.offsetY = y - start.y;
    this.fillStyle = fillStyle;
    this.size = size;
    this.timeGap = 1;
    if (offset) {
      this.offsetX += (Math.random() - 0.5) * offset;
      this.offsetY += (Math.random() - 0.5) * offset;
    }

    this.initialTime = delay
       ? (-1 * Math.random() * delay) >> 0
      : 0;

    this.time = this.initialTime;
    this.status = 0;
  }

  reverse() {
    this.timeGap *= -1;
  }

  get isFinished() {
    return this.status === this.timeGap;
  }

  nextPoint(animation, totalTime) {
    this.time += this.timeGap;

    // time 小于0表示还没有画布中
    if (this.time < 0) {
      this.status = -1;
      return null;
    }

    const { time, x, y, offsetX, offsetY, targetX, targetY } = this;
    if (time < totalTime) {
      this.status = 0;

      return [
        animation({
          now: x,
          total: offsetX,
          time,
          totalTime,
        }),
        animation({
          now: y,
          total: offsetY,
          time,
          totalTime,
        }),
      ];
    }

    this.status = 1;
    return [targetX, targetY];
  }
}
