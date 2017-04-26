/* eslint-disable no-new */
(function () {
	window.onresize = infinite
	var html = document.documentElement
	function infinite () {
		var htmlWidth = html.clientWidth
		// 通过'ontouchstart' in document 判断是否是移动端
		if ('ontouchstart' in document) {
			if (htmlWidth <= 320) {
				html.style.fontSize = 12 + 'px'
			} else if (htmlWidth >= 720) {
				html.style.fontSize = 28.8 + 'px'
			} else {
				html.style.fontSize = 28.8 / 720 * htmlWidth + 'px'
			}
		} else {
			html.style.fontSize = 16 + 'px'
		}
	}
    infinite()
})()
