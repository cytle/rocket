import { easeInOutExpo } from './animations';

class Canvas {
	constructor({
		totalTime,
		el,
		globalAlpha = 0.2,
		width,
		height,
		backgroundColor = '#FFF'
	}) {
		if(!el.getContext) {
			throw new Error('canvas.getContext 不支持');
			return;
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

	// 清空画布
	beforeDraw() {
		const {
			ctx, width, height, backgroundColor, globalAlpha
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
			ctx
		} = this;

		this.beforeDraw();

		for (particle of particles) {
			const point = particle.nextPoint(easeInOutExpo, totalTime);
			if (!point) {
				continue;
			}
			ctx.fillStyle = particle.fillStyle;
			ctx.fillRect(point.x, point.y, 1, 1);
		}
	}
}

export default Canvas;
