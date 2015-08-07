/*global describe, expect, it, SAMURAIPRINCIPLE*/
describe('Game of Life', function () {
	describe('Determining whether cell is alive in next generation', function () {
		it('should return false when a live cell has fewer than two live neighbours - under-population', function () {
			expect(SAMURAIPRINCIPLE.isCellAliveInNextGeneration(true, 0)).toBe(false);
			expect(SAMURAIPRINCIPLE.isCellAliveInNextGeneration(true, 1)).toBe(false);
		});
		it('should return true when a live cell has two or three live neighbours - survival', function () {
			expect(SAMURAIPRINCIPLE.isCellAliveInNextGeneration(true, 2)).toBe(true);
			expect(SAMURAIPRINCIPLE.isCellAliveInNextGeneration(true, 3)).toBe(true);
		});
		it('should return false when a live cell has more than three live neighbours - overcrowding', function () {
			expect(SAMURAIPRINCIPLE.isCellAliveInNextGeneration(true, 4)).toBe(false);
			expect(SAMURAIPRINCIPLE.isCellAliveInNextGeneration(true, 5)).toBe(false);
			expect(SAMURAIPRINCIPLE.isCellAliveInNextGeneration(true, 6)).toBe(false);
			expect(SAMURAIPRINCIPLE.isCellAliveInNextGeneration(true, 7)).toBe(false);
			expect(SAMURAIPRINCIPLE.isCellAliveInNextGeneration(true, 8)).toBe(false);
		});
		it('should return true when a dead cell has exactly three live neighbours - reproduction', function () {
			expect(SAMURAIPRINCIPLE.isCellAliveInNextGeneration(false, 3)).toBe(true);
			expect(SAMURAIPRINCIPLE.isCellAliveInNextGeneration(false, 2)).toBe(false);
			expect(SAMURAIPRINCIPLE.isCellAliveInNextGeneration(false, 4)).toBe(false);
		});
		it('should work', function () {
			var mem = function (fn) {
				var results = {};
				return function (arg) {
					return results[arg] = results[arg] || fn(arg);
				};
			};

			function getColour(colourName) {
				console.log('here', colourName);
				if (colourName === 'red') {
					return 0xFF0000;
				} else if (colourName === 'green') {
					return 0x00FF00;
				}
			}

			var memGc = mem(getColour);

			expect(memGc('red')).toBe(0xFF0000);
			expect(memGc('red')).toBe(0xFF0000);
			expect(memGc('red')).toBe(0xFF0000);
			expect(memGc('green')).toBe(0x00FF00);
		})
	});
});
