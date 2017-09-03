import { easeInOutExpo } from './animations';

class Canvas {
  constructor({
    totalTime,
    el,
    globalAlpha = 0.8,
    width,
    height,
    backgroundColor = '#000',
  }) {
    if (!el.getContext) {
      throw new Error('canvas.getContext 不支持');
    }
    this.ctx = el.getContext('2d');
    this.width = width || el.width;
    this.height = height || el.height;
    this.globalAlpha = globalAlpha;

    el.width = width;
    el.height = height;

    this.totalTime = totalTime;
    this.backgroundColor = backgroundColor;
  }

  readImageData({ x, y, width, height }, imgObj) {
    const { ctx } = this;
    // 把图像绘制到画布坐标为(100,100)的地方
    ctx.drawImage(imgObj, x, y, width, height);
    // imgObj = null;
    const imageData = ctx.getImageData(x, y, width, height);
    // ctx.clearRect(0, 0, this.width, this.height); // 清除画布

    return imageData.data;
  }

  // 清空画布
  beforeDraw() {
    const {
      ctx, width, height, backgroundColor, globalAlpha,
    } = this;
    ctx.save();
    ctx.globalAlpha = globalAlpha;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  drawParticles(particles) {
    const {
      totalTime,
      ctx,
    } = this;

    this.beforeDraw();

    particles
      .forEach((particle) => {
        const point = particle.nextPoint(easeInOutExpo, totalTime);
        if (!point) {
          ctx.fillStyle = particle.fillStyle;
          ctx.fillRect(point.x, point.y, 1, 1);
        }
      });
  }
}

export default Canvas;
