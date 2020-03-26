
import { generateRandomNumberBelow, range, generateRandomColors } from "../../Utils";

describe('Utils module', () => {
	it('should return a random number less than 20', () => {
		const number = generateRandomNumberBelow(20);
		expect(number).toBeLessThan(20);
	});

	it('should return an array of certain length using the `range` function', () => {
		const array = range(0, 9, 1);
		expect(array.length).toBe(10);
	});

	test('`generateRandomColors` should return an array of random colors of length 5', () => {
		const colors = generateRandomColors(5);
		expect(colors.length).toBe(5);
	});
})