Function.prototype.extend = function(parent, obj) {
	if (typeof parent === "function") {
		var p = parent.prototype;
		var c = this.prototype;
		for (var key in p) {
			if (!c.hasOwnProperty(key)) {
				c[key] = p[key];
			}
		}
		obj = obj || {};
		if (Object.keys(obj).length > 0) {
			for (var key2 in obj) {
				if (!c.hasOwnProperty(key2)) {
					c[key2] = p[key2];
				}
			}
		}
	}
}
