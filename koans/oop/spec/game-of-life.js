var SAMURAIPRINCIPLE = {
  GameOfLife: function() {
  	var self = this;
  	var world = {};

  	this.isCellAlive = function(row, col) {
  		var key = createKey(row, col);
  		return world[key] || false;
  	};

  	this.toggleCellState = function(row, col) {
  		var key = createKey(row, col);
  		var alive = world[key];
  		if (alive) {
  			delete world[key];
  		} else {
	  		world[key] = true;
  		}
  		return this;
  	};

  	this.tick = function() {
  		var neighbours = {};

  		for(var key in world) {
  			neighbours[key] = numberOfNeighbours(key);
  		}

debugger;
  		for(var key in world) {
  			if (isCellAliveByKey(key)) {
	  			if (neighbours[key] < 2 || neighbours[key] > 3) {
	  				var key = splitKey(key);
	  				self.toggleCellState(key.row, key.col);
  				}
  			} else {
	  			if (neighbours[key] === 3) {
	  				var key = splitKey(key);
	  				self.toggleCellState(key.row, key.col);
  				}
  			}
  		}
  	};

  	function createKey(row, col) {
  		return row.toString() + ':' + col.toString();
  	}

  	function numberOfNeighbours(key) {
  		var cell = splitKey(key);
  		var row = cell.row;
  		var col = cell.col;
  		var count = 0;

  		function check(row, col) {
  			if (self.isCellAlive(row, col)) {
  				count++;
  			}
  		}

  		check(row-1, col-1);
  		check(row-1, col);
  		check(row-1, col+1);
  		check(row, col-1);
  		check(row, col+1);
  		check(row+1, col-1);
  		check(row+1, col);
  		check(row+1, col+1);

  		return count;
  	}

  	function isCellAliveByKey(key) {
  		var cell = splitKey(key);
  		return self.isCellAlive(cell.row, cell.col);
  	}

  	function splitKey(key) {
			var rowCol = key.split(':');
  		return {
  			row: parseInt(rowCol[0], 10),
  			col: parseInt(rowCol[1])
  		};
  	}

  }
};

/*global beforeEach, describe, expect, it, SAMURAIPRINCIPLE*/
describe('Game of Life', function () {
	'use strict';
	var gameOfLife;
	beforeEach(function () {
		gameOfLife = new SAMURAIPRINCIPLE.GameOfLife();
	});
	it('should make sure all the cells are dead when a new game is created', function () {
		var isCellAlive;

		isCellAlive = gameOfLife.isCellAlive(2, 3);

		expect(isCellAlive).toBe(false);
	});
	it('should set the cell state to alive when toggleCellState method is called', function () {
		gameOfLife.toggleCellState(2, 3);

		expect(gameOfLife.isCellAlive(2, 3)).toBe(true);
	});
	it('should set the cell state to dead in next generation if the cell is alive in current generation and has less than 2 neighbours', function () {
		gameOfLife.toggleCellState(2, 3);

		gameOfLife.tick();

		expect(gameOfLife.isCellAlive(2, 3)).toBe(false);
	});
	it('should keep the cell alive in next generation if the cell has two or three live neighbours', function () {
		gameOfLife.toggleCellState(2, 3).toggleCellState(2, 4).toggleCellState(2, 5);

		gameOfLife.tick();

		expect(gameOfLife.isCellAlive(2, 4)).toBe(true);
	});
	it('should set the cell state to dead in next generation if the cell is alive in current generation and has more than 3 neighbours', function () {
		gameOfLife.toggleCellState(2, 2).toggleCellState(2, 3).toggleCellState(2, 4)
										.toggleCellState(3, 3)
										.toggleCellState(4, 3);

		gameOfLife.tick();

		expect(gameOfLife.isCellAlive(3, 3)).toBe(false);
	});
	it('should set the cell state to alive in next generation if the cell is dead and has three live neighbours', function () {
		gameOfLife.toggleCellState(2, 3).toggleCellState(2, 4).toggleCellState(2, 5);

		gameOfLife.tick();

		expect(gameOfLife.isCellAlive(3, 4)).toBe(true);
	});
});
