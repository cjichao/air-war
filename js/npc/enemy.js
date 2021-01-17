const ENEMY_IMG_SRC = 'images/enemy.png'
const ENEMY_WIDTH = 160
const ENEMY_HEIGHT = 160

const __enemyspeed = {
	speed: Symbol('speed')
}

// const databus = new DataBus()

function rnd(start, end) {
	return Math.floor(Math.random() * (end - start) + start)
}

function Enemy() {
	Animation.call(this, ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT)
	this.initExplosionAnimation()
}
Enemy.prototype = {
	constructor: Enemy,
	init: function(speed) {
		this.x = rnd(0, window.innerWidth - ENEMY_WIDTH)
		this.y = -this.height

		this[__enemyspeed.speed] = speed

		this.visible = true
	},
	// 预定义爆炸的帧动画
	initExplosionAnimation: function() {
		const frames = []

		const EXPLO_IMG_PREFIX = 'images/explosion'
		const EXPLO_FRAME_COUNT = 19

		for (let i = 0; i < EXPLO_FRAME_COUNT; i++) {
			frames.push(`${EXPLO_IMG_PREFIX + (i + 1)}.png`)
		}

		this.initFrames(frames)
	},
	// 每一帧更新子弹位置
	update: function() {
		this.y += this[__enemyspeed.speed]

		// 对象回收
		if (this.y > window.innerHeight + this.height) databus.removeEnemey(this)
	}
}
Enemy.extend(Animation)

// var e = new Enemy()
// console.log(e)
