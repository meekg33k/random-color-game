export const DEFAULT_BACKGROUND_COLOR = 'white';
export const MIN_DIFFICULTY_LEVEL = 4;
export const MAX_DIFFICULTY_LEVEL = 10;
export const FAIL_STATUS_MESSAGE = 'Sorry, try again!';
export const WIN_STATUS_MESSAGE = 'Congrats, you won!';

const COLORS = [
	'green', 'blue', 'red', 'turquoise', 'black',
	'orange', 'purple', 'teal', 'yellow', 'lime',
	'wheat', 'violet', 'indigo', 'pink', 'tomato',
	'orchid', 'gray', 'olive', 'dodgerblue', 'darkgray'
]

export const generateRandomColors = (count) => {
	const colors = [];
	const colorMap = {};

	while (colors.length < count) {
		const color = generateRandomColorFromMap();
		if (!colorMap[color]) {
			colorMap[color] = color;
			colors.push(color);
		}
	}

	return colors;
}

const generateRandomColorFromMap = () => COLORS[generateRandomNumberBelow(COLORS.length)];

export const generateRandomNumberBelow = (max) => Math.floor(Math.random() * (max));

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
export const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));

/** Two methods for randoming colors
 * 	Open to discussion
 */
//https://dev.to/akhil_001/generating-random-color-with-single-line-of-js-code-fhj
//const generateRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

//	https://www.paulirish.com/2009/random-hex-color-code-snippetsgenerate 
//const generateRandomColorTwo = () => "#" + (Math.random().toString(16) + "000000").slice(2, 8);