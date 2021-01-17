const BULLET_IMG_SRC = 'images/bullet.png'
const BULLET_WIDTH = 16
const BULLET_HEIGHT = 30

const __bulletspeed = {
	speed: Symbol('speed')
}

// const databus = new DataBus()

function Bullet() {
	Sprite.call(this, BULLET_IMG_SRC, BULLET_WIDTH, BULLET_HEIGHT)
}
Bullet.prototype = {
	constructor: Bullet,
	init: function(x, y, speed) {
		this.x = x
		this.y = y

		this[__bulletspeed.speed] = speed

		this.visible = true
	},
	// 每一帧更新子弹位置
	update: function() {
		this.y -= this[__bulletspeed.speed]

		// 超出屏幕外回收自身
		if (this.y < -this.height) databus.removeBullets(this)
	}
}
Bullet.extend(Sprite)
