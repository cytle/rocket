export default class Particle {
  constructor({
    x, // 点的x坐标
    y, // 点的y坐标
    fillStyle,
    size,
    start, // 出发点
    delay = 240,
    offset = 10,
  }) {
    this.x = start.x;
    this.y = start.y;
    this.fillStyle = fillStyle;
    this.size = size;
    this.timeGap = 1;
    // 偏移量 = 最终位置 + 随机偏移值 - 初始位置
    this.offsetX = x + (Math.random() - 0.5) * offset - this.x;
    this.offsetY = y + (Math.random() - 0.5) * offset - this.y;

    // 出发延迟时间范围为(-delay, 0]
    this.initialTime = (-1 * Math.random() * delay) >> 0;

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

    const { time, x, y, offsetX, offsetY } = this;
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
