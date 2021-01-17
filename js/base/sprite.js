/**
 * 游戏基础的精灵类
 */
function Sprite(imgSrc, width, height, x, y) {
	this.img = new Image()
	this.img.src = imgSrc || ''

	this.width = width || 0
	this.height = height || 0

	this.x = x || 0
	this.y = y || 0
	
	this.visible = true
}
Sprite.prototype = {
	constructor: Sprite,
	/**
	 * 将精灵图绘制在canvas上
	 */
	drawToCanvas: function(ctx) {
		if (!this.visible) return

		ctx.drawImage(
			this.img,
			this.x,
			this.y,
			this.width,
			this.height
		)
	},

	/**
	 * 简单的碰撞检测定义：
	 * 另一个精灵的中心点处于本精灵所在的矩形内即可
	 * @param{Sprite} sp: Sptite的实例
	 */
	isCollideWith: function(sp) {
		const spX = sp.x + sp.width / 2
		const spY = sp.y + sp.height / 2

		if (!this.visible || !sp.visible) return false

		return !!(spX >= this.x &&
			spX <= this.x + this.width &&
			spY >= this.y &&
			spY <= this.y + this.height)
	}
}
