// 玩家相关常量设置
const PLAYER_IMG_SRC = 'images/hero.png'
const PLAYER_WIDTH = 180
const PLAYER_HEIGHT = 80

// const databus = new DataBus()
function Player() {
	Sprite.call(this, PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT)
	// 玩家默认处于屏幕底部居中位置
	this.x = screenWidth / 2 - this.width / 2
	this.y = screenHeight - this.height - 30

	// 用于在手指移动的时候标识手指是否已经在飞机上了
	this.touched = false

	this.bullets = []

	// 初始化事件监听
	this.initEvent()
}

Player.prototype = {
	constructor: Player,
	/**
	 * 当手指触摸屏幕的时候
	 * 判断手指是否在飞机上
	 * @param {Number} x: 手指的X轴坐标
	 * @param {Number} y: 手指的Y轴坐标
	 * @return {Boolean}: 用于标识手指是否在飞机上的布尔值
	 */
	checkIsFingerOnAir: function(x, y) {
		const deviation = 30

		return !!(x >= this.x - deviation &&
			y >= this.y - deviation &&
			x <= this.x + this.width + deviation &&
			y <= this.y + this.height + deviation)
	},
	/**
	 * 根据手指的位置设置飞机的位置
	 * 保证手指处于飞机中间
	 * 同时限定飞机的活动范围限制在屏幕中
	 */
	setAirPosAcrossFingerPosZ: function(x, y) {
		let disX = x - this.width / 2
		let disY = y - this.height / 2

		if (disX < 0) disX = 0

		else if (disX > screenWidth - this.width) disX = screenWidth - this.width

		if (disY <= 0) disY = 0

		else if (disY > screenHeight - this.height) disY = screenHeight - this.height

		this.x = disX
		this.y = disY
	},

	/**
	 * 玩家响应手指的触摸事件
	 * 改变战机的位置
	 */
	initEvent: function() {
		canvas.addEventListener('touchstart', ((e) => {
			e.preventDefault()

			const x = e.touches[0].clientX
			const y = e.touches[0].clientY

			//
			if (this.checkIsFingerOnAir(x, y)) {
				this.touched = true

				this.setAirPosAcrossFingerPosZ(x, y)
			}
		}))

		canvas.addEventListener('touchmove', ((e) => {
			e.preventDefault()

			const x = e.touches[0].clientX
			const y = e.touches[0].clientY

			if (this.touched) this.setAirPosAcrossFingerPosZ(x, y)
		}))

		canvas.addEventListener('touchend', ((e) => {
			e.preventDefault()

			this.touched = false
		}))
	},
	/**
	 * 玩家射击操作
	 * 射击时机由外部决定
	 */
	shoot: function() {
		const bullet = databus.pool.getItemByClass('bullet', Bullet)

		bullet.init(
			this.x + this.width / 2 - bullet.width / 2,
			this.y - 10,
			10
		)

		databus.bullets.push(bullet)
	}
}
Player.extend(Sprite)
