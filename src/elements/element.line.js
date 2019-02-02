'use strict';

var defaults = require('../core/core.defaults');
var Element = require('../core/core.element');
var helpers = require('../helpers/index');

var valueOrDefault = helpers.valueOrDefault;

var defaultColor = defaults.global.defaultColor;

defaults._set('global', {
	elements: {
		line: {
			tension: 0.4,
			backgroundColor: defaultColor,
			borderWidth: 3,
			borderColor: defaultColor,
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			capBezierPoints: true,
			fill: true, // do we fill in the area between the line and its base axis
		}
	}
});

module.exports = Element.extend({
	draw: function() {
		var me = this;
		var vm = me._view;
		var ctx = me._chart.ctx;
		var spanGaps = vm.spanGaps;
		var points = me._children.slice(); // clone array
		var globalDefaults = defaults.global;
		var globalOptionLineElements = globalDefaults.elements.line;
		var lastDrawnIndex = -1;
		var index, current, previous, currentVM;
		var lineOptions;
		var settings;
		var previousSettings;
		var settingsChanged;

		// If we are looping, adding the first point again
		if (me._loop && points.length) {
			points.push(points[0]);
		}

		for (index = 0; index < points.length; ++index) {
			current = points[index];
			previous = helpers.previousItem(points, index);
			currentVM = current._view;
			lineOptions = current._lineOptions || {};
			settings = {
				lineCap: lineOptions.borderCapStyle || globalOptionLineElements.borderCapStyle,
				lineDashOffset: valueOrDefault(
					lineOptions.borderDashOffset,
					globalOptionLineElements.borderDashOffset),
				lineJoin: lineOptions.borderJoinStyle || globalOptionLineElements.borderJoinStyle,
				lineWidth: valueOrDefault(lineOptions.borderWidth, globalOptionLineElements.borderWidth),
				strokeStyle: lineOptions.borderColor || globalDefaults.defaultColor,
				lineDash: lineOptions.borderDash || globalOptionLineElements.borderDash,
			};
			settingsChanged = true;
			if (previousSettings &&
				JSON.stringify(settings) === JSON.stringify(previousSettings)) {
				settingsChanged = false;
			}
			if (settingsChanged) {
				if (previousSettings) {
					ctx.stroke();
					ctx.restore();
				}
				ctx.save();

				// Stroke Line Options
				ctx.lineCap = settings.lineCap;
				ctx.lineDashOffset = settings.lineDashOffset;
				ctx.lineJoin = settings.lineJoin;
				ctx.lineWidth = settings.lineWidth;
				ctx.strokeStyle = settings.strokeStyle;

				// IE 9 and 10 do not support line dash
				if (ctx.setLineDash &&
					Array.isArray(settings.lineDash)) {
					ctx.setLineDash(settings.lineDash);
				}

				// Stroke Line
				ctx.beginPath();
			}

			// First point moves to it's starting position no matter what
			if (index === 0) {
				if (!currentVM.skip) {
					ctx.moveTo(currentVM.x, currentVM.y);
					lastDrawnIndex = index;
				}
			} else {
				previous = lastDrawnIndex === -1 ? previous : points[lastDrawnIndex];

				if (!currentVM.skip) {
					ctx.moveTo(previous._view.x, previous._view.y);
					if ((lastDrawnIndex !== (index - 1) && !spanGaps) || lastDrawnIndex === -1) {
						if (settings.lineDash) {
							helpers.canvas.lineTo(ctx, previous._view, current._view);
						} else {
							// There was a gap and this is the first point after the gap
							ctx.moveTo(currentVM.x, currentVM.y);
						}
					} else {
						// Line to next point
						helpers.canvas.lineTo(ctx, previous._view, current._view);
					}
					lastDrawnIndex = index;
				}
			}
			previousSettings = settings;
		}
		ctx.stroke();
		ctx.restore();
	}
});
