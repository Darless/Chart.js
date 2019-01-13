// Tests for the line element
describe('Chart.elements.Line', function() {
	it('should be constructed', function() {
		var line = new Chart.elements.Line({
			_datasetindex: 2,
			_points: [1, 2, 3, 4]
		});

		expect(line).not.toBe(undefined);
		expect(line._datasetindex).toBe(2);
		expect(line._points).toEqual([1, 2, 3, 4]);
	});

	it('should draw with default settings', function() {
		var mockContext = window.createMockContext();

		// Create our points
		var points = [];
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 0,
			_view: {
				x: 0,
				y: 10,
				controlPointNextX: 0,
				controlPointNextY: 10
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 1,
			_view: {
				x: 5,
				y: 0,
				controlPointPreviousX: 5,
				controlPointPreviousY: 0,
				controlPointNextX: 5,
				controlPointNextY: 0
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 2,
			_view: {
				x: 15,
				y: -10,
				controlPointPreviousX: 15,
				controlPointPreviousY: -10,
				controlPointNextX: 15,
				controlPointNextY: -10
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 3,
			_view: {
				x: 19,
				y: -5,
				controlPointPreviousX: 19,
				controlPointPreviousY: -5,
				controlPointNextX: 19,
				controlPointNextY: -5
			}
		}));

		var line = new Chart.elements.Line({
			_datasetindex: 2,
			_chart: {
				ctx: mockContext,
			},
			_children: points,
			// Need to provide some settings
			_view: {
				fill: false, // don't want to fill
				tension: 0, // no bezier curve for now
			}
		});

		line.draw();
		expect(mockContext.getCalls().length).toBe(47);
	});

	it('should draw with straight lines for a tension of 0', function() {
		var mockContext = window.createMockContext();

		// Create our points
		var points = [];
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 0,
			_view: {
				x: 0,
				y: 10,
				controlPointNextX: 0,
				controlPointNextY: 10,
				tension: 0
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 1,
			_view: {
				x: 5,
				y: 0,
				controlPointPreviousX: 5,
				controlPointPreviousY: 0,
				controlPointNextX: 5,
				controlPointNextY: 0,
				tension: 0
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 2,
			_view: {
				x: 15,
				y: -10,
				controlPointPreviousX: 15,
				controlPointPreviousY: -10,
				controlPointNextX: 15,
				controlPointNextY: -10,
				tension: 0
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 3,
			_view: {
				x: 19,
				y: -5,
				controlPointPreviousX: 19,
				controlPointPreviousY: -5,
				controlPointNextX: 19,
				controlPointNextY: -5,
				tension: 0
			}
		}));

		var line = new Chart.elements.Line({
			_datasetindex: 2,
			_chart: {
				ctx: mockContext,
			},
			_children: points,
			// Need to provide some settings
			_view: {
				fill: false, // don't want to fill
				tension: 0, // no bezier curve for now
			}
		});

		line.draw();
		expect(mockContext.getCalls().length).toBe(47);
	});

	it('should draw stepped lines, with "before" interpolation', function() {

		// Both `true` and `'before'` should draw the same steppedLine
		var beforeInterpolations = [true, 'before'];

		beforeInterpolations.forEach(function(mode) {
			var mockContext = window.createMockContext();

			// Create our points
			var points = [];
			points.push(new Chart.elements.Point({
				_datasetindex: 2,
				_index: 0,
				_view: {
					x: 0,
					y: 10,
					controlPointNextX: 0,
					controlPointNextY: 10,
					steppedLine: mode
				}
			}));
			points.push(new Chart.elements.Point({
				_datasetindex: 2,
				_index: 1,
				_view: {
					x: 5,
					y: 0,
					controlPointPreviousX: 5,
					controlPointPreviousY: 0,
					controlPointNextX: 5,
					controlPointNextY: 0,
					steppedLine: mode
				}
			}));
			points.push(new Chart.elements.Point({
				_datasetindex: 2,
				_index: 2,
				_view: {
					x: 15,
					y: -10,
					controlPointPreviousX: 15,
					controlPointPreviousY: -10,
					controlPointNextX: 15,
					controlPointNextY: -10,
					steppedLine: mode
				}
			}));
			points.push(new Chart.elements.Point({
				_datasetindex: 2,
				_index: 3,
				_view: {
					x: 19,
					y: -5,
					controlPointPreviousX: 19,
					controlPointPreviousY: -5,
					controlPointNextX: 19,
					controlPointNextY: -5,
					steppedLine: mode
				}
			}));

			var line = new Chart.elements.Line({
				_datasetindex: 2,
				_chart: {
					ctx: mockContext,
				},
				_children: points,
				// Need to provide some settings
				_view: {
					fill: false, // don't want to fill
					tension: 0, // no bezier curve for now
				}
			});

			line.draw();
			expect(mockContext.getCalls().length).toBe(50);
		});
	});

	it('should draw stepped lines, with "middle" interpolation', function() {

		var mockContext = window.createMockContext();

		// Create our points
		var points = [];
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 0,
			_view: {
				x: 0,
				y: 10,
				controlPointNextX: 0,
				controlPointNextY: 10,
				steppedLine: 'middle'
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 1,
			_view: {
				x: 5,
				y: 0,
				controlPointPreviousX: 5,
				controlPointPreviousY: 0,
				controlPointNextX: 5,
				controlPointNextY: 0,
				steppedLine: 'middle'
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 2,
			_view: {
				x: 15,
				y: -10,
				controlPointPreviousX: 15,
				controlPointPreviousY: -10,
				controlPointNextX: 15,
				controlPointNextY: -10,
				steppedLine: 'middle'
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 3,
			_view: {
				x: 19,
				y: -5,
				controlPointPreviousX: 19,
				controlPointPreviousY: -5,
				controlPointNextX: 19,
				controlPointNextY: -5,
				steppedLine: 'middle'
			}
		}));

		var line = new Chart.elements.Line({
			_datasetindex: 2,
			_chart: {
				ctx: mockContext,
			},
			_children: points,
			// Need to provide some settings
			_view: {
				fill: false, // don't want to fill
				tension: 0, // no bezier curve for now
			}
		});

		line.draw();
		expect(mockContext.getCalls().length).toBe(53);
	});

	it('should draw stepped lines, with "after" interpolation', function() {

		var mockContext = window.createMockContext();

		// Create our points
		var points = [];
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 0,
			_view: {
				x: 0,
				y: 10,
				controlPointNextX: 0,
				controlPointNextY: 10,
				steppedLine: 'after'
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 1,
			_view: {
				x: 5,
				y: 0,
				controlPointPreviousX: 5,
				controlPointPreviousY: 0,
				controlPointNextX: 5,
				controlPointNextY: 0,
				steppedLine: 'after'
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 2,
			_view: {
				x: 15,
				y: -10,
				controlPointPreviousX: 15,
				controlPointPreviousY: -10,
				controlPointNextX: 15,
				controlPointNextY: -10,
				steppedLine: 'after'
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 3,
			_view: {
				x: 19,
				y: -5,
				controlPointPreviousX: 19,
				controlPointPreviousY: -5,
				controlPointNextX: 19,
				controlPointNextY: -5,
				steppedLine: 'after'
			}
		}));

		var line = new Chart.elements.Line({
			_datasetindex: 2,
			_chart: {
				ctx: mockContext,
			},
			_children: points,
			// Need to provide some settings
			_view: {
				fill: false, // don't want to fill
				tension: 0, // no bezier curve for now
			}
		});

		line.draw();
		expect(mockContext.getCalls().length).toBe(50);
	});

	it('should draw with custom settings', function() {
		var mockContext = window.createMockContext();

		// Create our points
		var points = [];
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 0,
			_view: {
				x: 0,
				y: 10,
				controlPointNextX: 0,
				controlPointNextY: 10
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 1,
			_view: {
				x: 5,
				y: 0,
				controlPointPreviousX: 5,
				controlPointPreviousY: 0,
				controlPointNextX: 5,
				controlPointNextY: 0
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 2,
			_view: {
				x: 15,
				y: -10,
				controlPointPreviousX: 15,
				controlPointPreviousY: -10,
				controlPointNextX: 15,
				controlPointNextY: -10
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 3,
			_view: {
				x: 19,
				y: -5,
				controlPointPreviousX: 19,
				controlPointPreviousY: -5,
				controlPointNextX: 19,
				controlPointNextY: -5
			}
		}));

		var line = new Chart.elements.Line({
			_datasetindex: 2,
			_chart: {
				ctx: mockContext,
			},
			_children: points,
			// Need to provide some settings
			_view: {
				fill: true,
				tension: 0, // no bezier curve for now

				borderCapStyle: 'round',
				borderColor: 'rgb(255, 255, 0)',
				borderDash: [2, 2],
				borderDashOffset: 1.5,
				borderJoinStyle: 'bevel',
				borderWidth: 4,
				backgroundColor: 'rgb(0, 0, 0)'
			}
		});

		line.draw();
		expect(mockContext.getCalls().length).toBe(47);
	});

	it('should skip points correctly', function() {
		var mockContext = window.createMockContext();

		// Create our points
		var points = [];
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 0,
			_view: {
				x: 0,
				y: 10,
				controlPointNextX: 0,
				controlPointNextY: 10
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 1,
			_view: {
				x: 5,
				y: 0,
				controlPointPreviousX: 5,
				controlPointPreviousY: 0,
				controlPointNextX: 5,
				controlPointNextY: 0
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 2,
			_view: {
				x: 15,
				y: -10,
				controlPointPreviousX: 15,
				controlPointPreviousY: -10,
				controlPointNextX: 15,
				controlPointNextY: -10,
				skip: true
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 3,
			_view: {
				x: 19,
				y: -5,
				controlPointPreviousX: 19,
				controlPointPreviousY: -5,
				controlPointNextX: 19,
				controlPointNextY: -5
			}
		}));

		var line = new Chart.elements.Line({
			_datasetindex: 2,
			_chart: {
				ctx: mockContext,
			},
			_children: points,
			// Need to provide some settings
			_view: {
				fill: true,
				tension: 0, // no bezier curve for now
			}
		});

		line.draw();
		expect(mockContext.getCalls().length).toBe(45);
	});

	it('should skip points correctly when spanGaps is true', function() {
		var mockContext = window.createMockContext();

		// Create our points
		var points = [];
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 0,
			_view: {
				x: 0,
				y: 10,
				controlPointNextX: 0,
				controlPointNextY: 10
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 1,
			_view: {
				x: 5,
				y: 0,
				controlPointPreviousX: 5,
				controlPointPreviousY: 0,
				controlPointNextX: 5,
				controlPointNextY: 0
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 2,
			_view: {
				x: 15,
				y: -10,
				controlPointPreviousX: 15,
				controlPointPreviousY: -10,
				controlPointNextX: 15,
				controlPointNextY: -10,
				skip: true
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 3,
			_view: {
				x: 19,
				y: -5,
				controlPointPreviousX: 19,
				controlPointPreviousY: -5,
				controlPointNextX: 19,
				controlPointNextY: -5
			}
		}));

		var line = new Chart.elements.Line({
			_datasetindex: 2,
			_chart: {
				ctx: mockContext,
			},
			_children: points,
			// Need to provide some settings
			_view: {
				fill: true,
				tension: 0, // no bezier curve for now
				spanGaps: true
			}
		});

		line.draw();
		expect(mockContext.getCalls().length).toBe(45);
	});

	it('should skip points correctly when all points are skipped', function() {
		var mockContext = window.createMockContext();

		// Create our points
		var points = [];
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 0,
			_view: {
				x: 0,
				y: 10,
				controlPointNextX: 0,
				controlPointNextY: 10,
				skip: true
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 1,
			_view: {
				x: 5,
				y: 0,
				controlPointPreviousX: 5,
				controlPointPreviousY: 0,
				controlPointNextX: 5,
				controlPointNextY: 0,
				skip: true
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 2,
			_view: {
				x: 15,
				y: -10,
				controlPointPreviousX: 15,
				controlPointPreviousY: -10,
				controlPointNextX: 15,
				controlPointNextY: -10,
				skip: true
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 3,
			_view: {
				x: 19,
				y: -5,
				controlPointPreviousX: 19,
				controlPointPreviousY: -5,
				controlPointNextX: 19,
				controlPointNextY: -5,
				skip: true
			}
		}));

		var line = new Chart.elements.Line({
			_datasetindex: 2,
			_chart: {
				ctx: mockContext,
			},
			_children: points,
			// Need to provide some settings
			_view: {
				fill: true,
				tension: 0, // no bezier curve for now
				spanGaps: true
			}
		});

		line.draw();
		expect(mockContext.getCalls().length).toBe(40);
	});

	it('should skip the first point correctly', function() {
		var mockContext = window.createMockContext();

		// Create our points
		var points = [];
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 0,
			_view: {
				x: 0,
				y: 10,
				controlPointNextX: 0,
				controlPointNextY: 10,
				skip: true
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 1,
			_view: {
				x: 5,
				y: 0,
				controlPointPreviousX: 5,
				controlPointPreviousY: 0,
				controlPointNextX: 5,
				controlPointNextY: 0
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 2,
			_view: {
				x: 15,
				y: -10,
				controlPointPreviousX: 15,
				controlPointPreviousY: -10,
				controlPointNextX: 15,
				controlPointNextY: -10
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 3,
			_view: {
				x: 19,
				y: -5,
				controlPointPreviousX: 19,
				controlPointPreviousY: -5,
				controlPointNextX: 19,
				controlPointNextY: -5
			}
		}));

		var line = new Chart.elements.Line({
			_datasetindex: 2,
			_chart: {
				ctx: mockContext,
			},
			_children: points,
			// Need to provide some settings
			_view: {
				fill: true,
				tension: 0, // no bezier curve for now
			}
		});

		line.draw();
		expect(mockContext.getCalls().length).toBe(46);
	});

	it('should skip the first point correctly when spanGaps is true', function() {
		var mockContext = window.createMockContext();

		// Create our points
		var points = [];
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 0,
			_view: {
				x: 0,
				y: 10,
				controlPointNextX: 0,
				controlPointNextY: 10,
				skip: true
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 1,
			_view: {
				x: 5,
				y: 0,
				controlPointPreviousX: 5,
				controlPointPreviousY: 0,
				controlPointNextX: 5,
				controlPointNextY: 0
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 2,
			_view: {
				x: 15,
				y: -10,
				controlPointPreviousX: 15,
				controlPointPreviousY: -10,
				controlPointNextX: 15,
				controlPointNextY: -10
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 3,
			_view: {
				x: 19,
				y: -5,
				controlPointPreviousX: 19,
				controlPointPreviousY: -5,
				controlPointNextX: 19,
				controlPointNextY: -5
			}
		}));

		var line = new Chart.elements.Line({
			_datasetindex: 2,
			_chart: {
				ctx: mockContext,
			},
			_children: points,
			// Need to provide some settings
			_view: {
				fill: true,
				tension: 0, // no bezier curve for now
				spanGaps: true
			}
		});

		line.draw();
		expect(mockContext.getCalls().length).toBe(46);
	});

	it('should skip the last point correctly', function() {
		var mockContext = window.createMockContext();

		// Create our points
		var points = [];
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 0,
			_view: {
				x: 0,
				y: 10,
				controlPointNextX: 0,
				controlPointNextY: 10
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 1,
			_view: {
				x: 5,
				y: 0,
				controlPointPreviousX: 5,
				controlPointPreviousY: 0,
				controlPointNextX: 5,
				controlPointNextY: 0
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 2,
			_view: {
				x: 15,
				y: -10,
				controlPointPreviousX: 15,
				controlPointPreviousY: -10,
				controlPointNextX: 15,
				controlPointNextY: -10
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 3,
			_view: {
				x: 19,
				y: -5,
				controlPointPreviousX: 19,
				controlPointPreviousY: -5,
				controlPointNextX: 19,
				controlPointNextY: -5,
				skip: true
			}
		}));

		var line = new Chart.elements.Line({
			_datasetindex: 2,
			_chart: {
				ctx: mockContext,
			},
			_children: points,
			// Need to provide some settings
			_view: {
				fill: true,
				tension: 0, // no bezier curve for now
			}
		});

		line.draw();
		expect(mockContext.getCalls().length).toBe(45);
	});

	it('should skip the last point correctly when spanGaps is true', function() {
		var mockContext = window.createMockContext();

		// Create our points
		var points = [];
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 0,
			_view: {
				x: 0,
				y: 10,
				controlPointNextX: 0,
				controlPointNextY: 10
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 1,
			_view: {
				x: 5,
				y: 0,
				controlPointPreviousX: 5,
				controlPointPreviousY: 0,
				controlPointNextX: 5,
				controlPointNextY: 0
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 2,
			_view: {
				x: 15,
				y: -10,
				controlPointPreviousX: 15,
				controlPointPreviousY: -10,
				controlPointNextX: 15,
				controlPointNextY: -10
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 3,
			_view: {
				x: 19,
				y: -5,
				controlPointPreviousX: 19,
				controlPointPreviousY: -5,
				controlPointNextX: 19,
				controlPointNextY: -5,
				skip: true
			}
		}));

		var line = new Chart.elements.Line({
			_datasetindex: 2,
			_chart: {
				ctx: mockContext,
			},
			_children: points,
			// Need to provide some settings
			_view: {
				fill: true,
				tension: 0, // no bezier curve for now
				spanGaps: true
			}
		});

		line.draw();
		expect(mockContext.getCalls().length).toBe(45);
	});

	it('should be able to draw with a loop back to the beginning point', function() {
		var mockContext = window.createMockContext();

		// Create our points
		var points = [];
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 0,
			_view: {
				x: 0,
				y: 10,
				controlPointPreviousX: 0,
				controlPointPreviousY: 10,
				controlPointNextX: 0,
				controlPointNextY: 10
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 1,
			_view: {
				x: 5,
				y: 0,
				controlPointPreviousX: 5,
				controlPointPreviousY: 0,
				controlPointNextX: 5,
				controlPointNextY: 0
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 2,
			_view: {
				x: 15,
				y: -10,
				controlPointPreviousX: 15,
				controlPointPreviousY: -10,
				controlPointNextX: 15,
				controlPointNextY: -10
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 3,
			_view: {
				x: 19,
				y: -5,
				controlPointPreviousX: 19,
				controlPointPreviousY: -5,
				controlPointNextX: 19,
				controlPointNextY: -5
			}
		}));

		var line = new Chart.elements.Line({
			_datasetindex: 2,
			_chart: {
				ctx: mockContext,
			},
			_children: points,
			_loop: true, // want the line to loop back to the first point
			// Need to provide some settings
			_view: {
				fill: true, // don't want to fill
				tension: 0, // no bezier curve for now
			}
		});

		line.draw();
		expect(mockContext.getCalls().length).toBe(59);
	});

	it('should be able to draw with a loop back to the beginning point when there is a skip in the middle of the dataset', function() {
		var mockContext = window.createMockContext();

		// Create our points
		var points = [];
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 0,
			_view: {
				x: 0,
				y: 10,
				controlPointPreviousX: 0,
				controlPointPreviousY: 10,
				controlPointNextX: 0,
				controlPointNextY: 10
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 1,
			_view: {
				x: 5,
				y: 0,
				controlPointPreviousX: 5,
				controlPointPreviousY: 0,
				controlPointNextX: 5,
				controlPointNextY: 0,
				skip: true
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 2,
			_view: {
				x: 15,
				y: -10,
				controlPointPreviousX: 15,
				controlPointPreviousY: -10,
				controlPointNextX: 15,
				controlPointNextY: -10
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 3,
			_view: {
				x: 19,
				y: -5,
				controlPointPreviousX: 19,
				controlPointPreviousY: -5,
				controlPointNextX: 19,
				controlPointNextY: -5
			}
		}));

		var line = new Chart.elements.Line({
			_datasetindex: 2,
			_chart: {
				ctx: mockContext,
			},
			_children: points,
			_loop: true, // want the line to loop back to the first point
			// Need to provide some settings
			_view: {
				fill: true, // don't want to fill
				tension: 0, // no bezier curve for now
			}
		});

		line.draw();
		expect(mockContext.getCalls().length).toBe(57);
	});

	it('should be able to draw with a loop back to the beginning point when span gaps is true and there is a skip in the middle of the dataset', function() {
		var mockContext = window.createMockContext();

		// Create our points
		var points = [];
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 0,
			_view: {
				x: 0,
				y: 10,
				controlPointPreviousX: 0,
				controlPointPreviousY: 10,
				controlPointNextX: 0,
				controlPointNextY: 10
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 1,
			_view: {
				x: 5,
				y: 0,
				controlPointPreviousX: 5,
				controlPointPreviousY: 0,
				controlPointNextX: 5,
				controlPointNextY: 0,
				skip: true
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 2,
			_view: {
				x: 15,
				y: -10,
				controlPointPreviousX: 15,
				controlPointPreviousY: -10,
				controlPointNextX: 15,
				controlPointNextY: -10
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 3,
			_view: {
				x: 19,
				y: -5,
				controlPointPreviousX: 19,
				controlPointPreviousY: -5,
				controlPointNextX: 19,
				controlPointNextY: -5
			}
		}));

		var line = new Chart.elements.Line({
			_datasetindex: 2,
			_chart: {
				ctx: mockContext,
			},
			_children: points,
			_loop: true, // want the line to loop back to the first point
			// Need to provide some settings
			_view: {
				fill: true, // don't want to fill
				tension: 0, // no bezier curve for now
				spanGaps: true
			}
		});

		line.draw();
		expect(mockContext.getCalls().length).toBe(57);
	});

	it('should be able to draw with a loop back to the beginning point when the first point is skipped', function() {
		var mockContext = window.createMockContext();

		// Create our points
		var points = [];
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 0,
			_view: {
				x: 0,
				y: 10,
				controlPointPreviousX: 0,
				controlPointPreviousY: 10,
				controlPointNextX: 0,
				controlPointNextY: 10,
				skip: true
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 1,
			_view: {
				x: 5,
				y: 0,
				controlPointPreviousX: 5,
				controlPointPreviousY: 0,
				controlPointNextX: 5,
				controlPointNextY: 0,
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 2,
			_view: {
				x: 15,
				y: -10,
				controlPointPreviousX: 15,
				controlPointPreviousY: -10,
				controlPointNextX: 15,
				controlPointNextY: -10
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 3,
			_view: {
				x: 19,
				y: -5,
				controlPointPreviousX: 19,
				controlPointPreviousY: -5,
				controlPointNextX: 19,
				controlPointNextY: -5
			}
		}));

		var line = new Chart.elements.Line({
			_datasetindex: 2,
			_chart: {
				ctx: mockContext,
			},
			_children: points,
			_loop: true, // want the line to loop back to the first point
			// Need to provide some settings
			_view: {
				fill: true, // don't want to fill
				tension: 0, // no bezier curve for now
			}
		});

		line.draw();
		expect(mockContext.getCalls().length).toBe(56);
	});

	it('should be able to draw with a loop back to the beginning point when the last point is skipped', function() {
		var mockContext = window.createMockContext();

		// Create our points
		var points = [];
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 0,
			_view: {
				x: 0,
				y: 10,
				controlPointPreviousX: 0,
				controlPointPreviousY: 10,
				controlPointNextX: 0,
				controlPointNextY: 10
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 1,
			_view: {
				x: 5,
				y: 0,
				controlPointPreviousX: 5,
				controlPointPreviousY: 0,
				controlPointNextX: 5,
				controlPointNextY: 0,
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 2,
			_view: {
				x: 15,
				y: -10,
				controlPointPreviousX: 15,
				controlPointPreviousY: -10,
				controlPointNextX: 15,
				controlPointNextY: -10
			}
		}));
		points.push(new Chart.elements.Point({
			_datasetindex: 2,
			_index: 3,
			_view: {
				x: 19,
				y: -5,
				controlPointPreviousX: 19,
				controlPointPreviousY: -5,
				controlPointNextX: 19,
				controlPointNextY: -5,
				skip: true
			}
		}));

		var line = new Chart.elements.Line({
			_datasetindex: 2,
			_chart: {
				ctx: mockContext,
			},
			_children: points,
			_loop: true, // want the line to loop back to the first point
			// Need to provide some settings
			_view: {
				fill: true, // don't want to fill
				tension: 0, // no bezier curve for now
			}
		});

		line.draw();
		expect(mockContext.getCalls().length).toBe(57);
	});
});
