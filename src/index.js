import Particle from './particle';
import Canvas from './canvas';

function loadImage(src, cb) {
	//新建一个image对象
	const imgObj = new Image();
	imgObj.onload = () => cb(imgObj);
	//设置image的source
	imgObj.src = src;
}

class Main {
	constructor({
		src,
		totalTime = 120,
		el,
		width = 800,
		height = 400,
		globalAlpha,
		backgroundColor,
		maxCols = 100,
		maxRows = 50,
		particleDelay,
		particleOffset
	}) {
		//获取canvas元素
		this.canvas = new Canvas({
			totalTime,
			el,
			width,
			height,
			globalAlpha,
			backgroundColor
		});
		this.draw = this.draw.bind(this);
		this.maxCols = maxCols;
		this.maxRows = maxRows;
		this.particleDelay = particleDelay;
		this.particleOffset = particleOffset;

		loadImage(src, (imgObj) => {
			this.image = {
				width: imgObj.width,
				height: imgObj.height,
				x: (this.canvas.width - imgObj.width) / 2,
				y: (this.canvas.height - imgObj.height) / 2
			};
			const imageData = this.canvas.readImageData(this.image, imgObj);

			this.particles = this.calculateParticles(imageData, {
				start: this.fullParticlesStart()
			});
			this.draw();
		});
	}

	fullParticlesStart() {
		const { width, height } = this.canvas;
		return () => ({
			x: Math.random() * width,
			y: Math.random() * height
		});
	}
	onePointParticlesStart() {
		const start = {
			x: this.canvas.width / 2,
			y: Math.min(this.canvas.height - 10, this.image.y + this.image.height + 300)
		};
		return () => start;
	}
	calculateParticles(imageData, { start }) {
		const particles = [];
		const {
			x: imageX,
			y: imageY,
			width: imageW,
			height: imageH
		} = this.image;
		const cols = this.maxCols;
		const rows = this.maxRows;
		const cellWidth = imageW / cols;
		const cellHeight = imageH / rows;
		const round = Math.round;
		for(let i = 0; i < cols; i++) {
			for(let j = 0; j < rows; j++) {
				const x = round(i * cellWidth)
				const y = round(j * cellHeight)

				//计算(i,j)在数组中的R的坐标值
				const pos = (y * imageW + x) * 4;

				//判断像素透明度值是否符合要求
				if(imageData[pos + 3] <= 100){
					continue;
				}

				//符合要求的粒子保存到数组里
				particles.push(new Particle({
					x: imageX + x,
					y: imageY + y,
					fillStyle: `rgb(${imageData[pos]}, ${imageData[pos + 1]}, ${imageData[pos + 2]})`,
					start: start(),
					delay: this.particleDelay,
					offset: this.particleOffset
				}));
			}
		}
		return particles;
	}
	draw() {
		if (this.particles.every(({ isFinished }) => isFinished)) {
			this.particles.forEach(p => p.reverse());
		}
		this.canvas.drawParticles(this.particles);

		// 下一帧绘画
		requestAnimationFrame(this.draw);
	}
}

new Main({
	src: './rocket/rocket.png',
	el: document.getElementById('myCanvas'),
	particleDelay: 240,
	particleOffset: 10,
	maxCols: 100,
	maxRows: 100,
	width: document.body.clientWidth,
	height: document.body.clientHeight,
	globalAlpha: 0.4,
	backgroundColor: '#0c1328',
});

console.log('asdasd');
