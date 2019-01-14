function createCanvas(w, h) {
	var canvas = document.createElement('canvas');
	canvas.width = w;
	canvas.height = h;
	return canvas;
}

function readImageData(url, callback) {
	var image = new Image();

	image.onload = function() {
		var h = image.height;
		var w = image.width;
		var canvas = createCanvas(w, h);
		var ctx = canvas.getContext('2d');
		ctx.drawImage(image, 0, 0, w, h);
		callback(ctx.getImageData(0, 0, w, h));
	};

	image.src = url;
}

/**
 * Injects a new canvas (and div wrapper) and creates teh associated Chart instance
 * using the given config. Additional options allow tweaking elements generation.
 * @param {object} config - Chart config.
 * @param {object} options - Chart acquisition options.
 * @param {object} options.canvas - Canvas attributes.
 * @param {object} options.wrapper - Canvas wrapper attributes.
 * @param {boolean} options.persistent - If true, the chart will not be released after the spec.
 */
function acquireChart(config, options) {
	var wrapper = document.createElement('div');
	var canvas = document.createElement('canvas');
	var chart, key;

	config = config || {};
	options = options || {};
	options.canvas = options.canvas || {height: 512, width: 512};
	options.wrapper = options.wrapper || {class: 'chartjs-wrapper'};

	for (key in options.canvas) {
		if (options.canvas.hasOwnProperty(key)) {
			canvas.setAttribute(key, options.canvas[key]);
		}
	}

	for (key in options.wrapper) {
		if (options.wrapper.hasOwnProperty(key)) {
			wrapper.setAttribute(key, options.wrapper[key]);
		}
	}

	// by default, remove chart animation and auto resize
	config.options = config.options || {};
	config.options.animation = config.options.animation === undefined ? false : config.options.animation;
	config.options.responsive = config.options.responsive === undefined ? false : config.options.responsive;
	config.options.defaultFontFamily = config.options.defaultFontFamily || 'Arial';

	wrapper.appendChild(canvas);
	window.document.body.appendChild(wrapper);

	try {
		chart = new Chart(canvas.getContext('2d'), config);
	} catch (e) {
		window.document.body.removeChild(wrapper);
		throw e;
	}

	chart.$test = {
		persistent: options.persistent,
		wrapper: wrapper
	};

	return chart;
}

function releaseChart(chart) {
	chart.destroy();

	var wrapper = (chart.$test || {}).wrapper;
	if (wrapper && wrapper.parentNode) {
		wrapper.parentNode.removeChild(wrapper);
	}
}

function injectCSS(css) {
	// https://stackoverflow.com/q/3922139
	var head = document.getElementsByTagName('head')[0];
	var style = document.createElement('style');
	style.setAttribute('type', 'text/css');
	if (style.styleSheet) { // IE
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}
	head.appendChild(style);
}

function waitForResize(chart, callback) {
	var override = chart.resize;
	chart.resize = function() {
		chart.resize = override;
		override.apply(this, arguments);
		callback();
	};
}

function triggerMouseEvent(chart, type, el) {
	var node = chart.canvas;
	var rect = node.getBoundingClientRect();
	var event = new MouseEvent(type, {
		clientX: rect.left + el._model.x,
		clientY: rect.top + el._model.y,
		cancelable: true,
		bubbles: true,
		view: window
	});

	node.dispatchEvent(event);
}

function expectedCanvasCalls(settings) {
	var context = settings.context;
	var contains = settings.contains || false;
	var total = settings.total;
	var expectedCalls = settings.calls;
	var contextCalls = context.getCalls();
	if(contains) {
		expect(contextCalls).toContain(expectedCalls);
	} else {
		expect(contextCalls).toEqual(expectedCalls);
	}
	if (settings.total != undefined) {
		expect(contextCalls.length).toBe(total)
	}
}

function canvasCall(name, args) {
	var obj = {};
	obj.name = name;
	obj.args = args;
	return obj;
}

module.exports = {
	injectCSS: injectCSS,
	canvasCall: canvasCall,
	createCanvas: createCanvas,
	acquireChart: acquireChart,
	expectedCanvasCalls: expectedCanvasCalls,
	releaseChart: releaseChart,
	readImageData: readImageData,
	triggerMouseEvent: triggerMouseEvent,
	waitForResize: waitForResize
};
