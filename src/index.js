import Particle from './particle';
import Canvas from './canvas';

function loadImage(src, cb) {
  // 新建一个image对象
  const imgObj = new Image();
  imgObj.onload = () => cb(imgObj);
  // 设置image的source
  imgObj.src = src;
}

export default class Rocket {
  constructor({
    totalTime = 120,
    el,
    width = 800,
    height = 400,
    globalAlpha,
    backgroundColor,
    ...options
  }) {
    this.draw = this.draw.bind(this);
    // 获取canvas元素
    this.canvas = new Canvas({
      totalTime,
      el,
      width,
      height,
      globalAlpha,
      backgroundColor,
    });
    this.setOptions(options);
  }

  setOptions({
    maxCols = 100,
    maxRows = 50,
    particleDelay = 0,
    particleOffset = 0,
    particleSize = 2,
    repeat = false,
    startFrom = 'full',
  }) {
    this.maxCols = maxCols;
    this.maxRows = maxRows;
    this.particleDelay = particleDelay;
    this.particleOffset = particleOffset;
    this.particleSize = particleSize;
    this.repeat = repeat;
    this.startFrom = startFrom;
  }

  drawImage(src, options) {
    // this.setOptions(options);
    this.startFrom = options.startFrom;

    loadImage(src, (imgObj) => {
      const canvas = this.canvas;
      this.image = {
        width: imgObj.width,
        height: imgObj.height,
        x: (canvas.width - imgObj.width) / 2,
        y: (canvas.height - imgObj.height) / 2,
      };
      const imageData = canvas.readImageData(this.image, imgObj);
      const generateStart = this.startFrom === 'full'
        ? this.fullParticlesStart()
        : this.onePointParticlesStart();

      this.particles = this.calculateParticles(imageData, {
        generateStart,
      });

      canvas.clear();
      this.stop();

      this.draw();
    });
  }

  stop() {
    cancelAnimationFrame(this.requestID);
  }

  fullParticlesStart() {
    const { width, height } = this.canvas;
    return () => ({
      x: Math.random() * width,
      y: Math.random() * height,
    });
  }

  onePointParticlesStart() {
    const canvas = this.canvas;
    const image = this.image;
    const start = {
      x: canvas.width / 2,
      y: Math.min(canvas.height, image.y + image.height + 300),
    };
    return () => start;
  }

  calculateParticles(imageData, { generateStart }) {
    const particles = [];
    const {
      x: imageX,
      y: imageY,
      width: imageW,
      height: imageH,
    } = this.image;
    const cols = this.maxCols;
    const rows = this.maxRows;
    const cellWidth = imageW / cols;
    const cellHeight = imageH / rows;
    const round = Math.round;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = round(i * cellWidth);
        const y = round(j * cellHeight);

        // 计算(i,j)在数组中的R的坐标值
        const pos = (y * imageW + x) * 4;

        // 判断像素透明度值是否符合要求
        if (imageData[pos + 3] <= 100) {
          continue;
        }

        // 符合要求的粒子保存到数组里
        particles.push(new Particle({
          x: imageX + x,
          y: imageY + y,
          fillStyle: `rgb(${imageData[pos]}, ${imageData[pos + 1]}, ${imageData[pos + 2]})`,
          start: generateStart(),
          size: this.particleSize,
          delay: this.particleDelay,
          offset: this.particleOffset,
        }));
      }
    }
    return particles;
  }

  draw() {
    const particles = this.particles;
    if (particles.every(p => p.isFinished)) {
      if (!this.repeat) {
        return;
      }
      for (let i = 0; i < particles.length; i++) {
        particles[i].reverse();
      }
    }

    this.canvas.drawParticles(particles);

    // 下一帧绘画
    this.requestID = requestAnimationFrame(this.draw);
  }
}
