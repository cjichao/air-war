(function() {
	var instance;
	/**
	 * 全局状态管理器
	 */
	function DataBus() {
		if (instance) return instance
		instance = this
		this.pool = new Pool()
		this.reset()
	}
	DataBus.prototype = {
		constructor: DataBus,
		reset: function() {
			this.frame = 0
			this.score = 0
			this.bullets = []
			this.enemys = []
			this.animations = []
			this.gameOver = false
		},
		/**
		 * 回收敌人，进入对象池
		 * 此后不进入帧循环
		 */
		removeEnemey: function(enemy) {
			const temp = this.enemys.shift()

			temp.visible = false

			this.pool.recover('enemy', enemy)
		},
		/**
		 * 回收子弹，进入对象池
		 * 此后不进入帧循环
		 */
		removeBullets: function(bullet) {
			const temp = this.bullets.shift()

			temp.visible = false

			this.pool.recover('bullet', bullet)
		}
	}
	window.DataBus = DataBus;
})();
