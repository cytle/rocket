class Particle {
	constructor({
		x,
		y,
		fillStyle,
		start,
		canvas,
		delay = 240,
		offset = 10,
		random = false,
		delay
	}) {
		this.x = x;
		this.y = y;
		this.offsetX = x - start.x;
		this.offsetY = y - start.y;
		this.fillStyle = fillStyle;
		this.canvas = canvas;
		if (offset) {
			this.offsetX += (Math.random() - 0.5 ) * offset;
			this.offsetY += (Math.random() - 0.5 ) * offset;
		}

		this.initialTime = delay
		 	? (-1 * Math.random() * delay) >> 0
			: 0;

		this.time = this.initialTime;
		this.status = 0;
	}

	reverse() {
		const start = this.start;

		this.start = {
			x: this.x,
			y: this.y
		};

		this.x = start.x;
		this.y = start.y;
		this.time = 0;
	}

	get isFinished() {
		return this.status === 1;
	}

	nextPoint(animation, totalTime) {
		this.time++;

		// time 小于1表示还没有画布中
		if (this.time < 1) {
			this.status = -1;
			return;
		};

		const { time, x, y } = this;

		this.status = time > totalTime ? 1 : 0;

		return {
			x: animation({
				now: x,
				total: offsetX,
				time,
				totalTime
			}),
			y: animation({
				now: y,
				total: offsetY,
				time,
				totalTime
			})
		}
	}

	function drawNextFrame(totalTime) {
	}
}
