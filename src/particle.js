export default class Particle {
  constructor({
    x,
    y,
    fillStyle,
    size,
    start,
    delay = 240,
    offset = 10,
  }) {
    this.x = start.x;
    this.y = start.y;
    this.fillStyle = fillStyle;
    this.size = size;
    this.timeGap = 1;
    this.targetX = x;
    this.targetY = y;
    if (offset) {
      this.targetX += (Math.random() - 0.5) * offset;
      this.targetY += (Math.random() - 0.5) * offset;
    }

    this.offsetX = this.targetX - this.x;
    this.offsetY = this.targetY - this.y;

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
    } else {
      this.status = 1;
    }

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
}
