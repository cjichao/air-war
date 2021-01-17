(function() {
	var instance

	function Music() {
		if (instance) return instance

		instance = this

		this.bgmAudio = new Audio()
		this.bgmAudio.loop = true
		this.bgmAudio.src = 'audio/bgm.mp3'

		this.shootAudio = new Audio()
		this.shootAudio.src = 'audio/bullet.mp3'

		this.boomAudio = new Audio()
		this.boomAudio.src = 'audio/boom.mp3'

		this.playBgm()
	}
	Music.prototype = {
		constructor: Music,
		start: function() {
			this.playBgm()
		},
		pause: function() {
			this.bgmAudio.pause();
			this.shootAudio.pause();
			this.boomAudio.pause();
		},
		stop:function(){
			this.pause();
			this.bgmAudio.currentTime = 0
			this.shootAudio.currentTime = 0
			this.boomAudio.currentTime = 0
		},
		playBgm: function() {
			this.bgmAudio.play()
		},
		playShoot: function() {
			this.shootAudio.currentTime = 0
			this.shootAudio.play()
		},
		playExplosion: function() {
			this.boomAudio.currentTime = 0
			this.boomAudio.play()
		}
	}

	window.Music = Music;
})();
