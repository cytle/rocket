import Particle from './particle';

function loadImage(src, cb) {
	//新建一个image对象
	let imgObj = new Image();
	imgObj.onload(() => cb(imgObj));
	//设置image的source
	imgObj.src = src;
}

class Main {
	constructor() {
		//获取canvas元素
		this.canvas = new Canvas(document.getElementById('myCanvas'));
		this.draw = this.draw.bind(this);
		loadImage('./rocket.png', (imgObj) => {
			const imageData = this.canvas.readImageData(imgObj);
			this.image = {
				width: imgObj.width,
				height: imgObj.height
			};
			this.draw(canvas, this.calculateParticles(imageData, {
				start() => {
					return this.fullParticlesStart();
				}
			}), 120);
		});
	}

	fullParticlesStart(particles) {
		return {
			x: Math.random() * width,
			y: Math.random() * height
		};
	}
	onePointParticlesStart(particles) {
		return {
			x: this.canvas.width / 2,
			y: 200 + this.image.height + 300
		}
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
					canvas: this.canvas
				}));
			}
		}
		return particles;
	}
	draw() {
		if (this.particles.every(({ isFinished }) => isFinished)) {
			this.particles.forEach(p => p.reverse());
		}
		this.canvas.draw(this.particles);

		// 下一帧绘画
		requestAnimationFrame(this.draw);
	}
}
