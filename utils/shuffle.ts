/** A simplified and sped up version of lodash's `_.shuffle` function
 *
 * @param collection An array or object collection
 * @returns A new array with the values shuffled around
 */
export const shuffle = (collection: any[] | {}): any[] => {
	const array = Array.isArray(collection)
		? collection.map((v) => v)
		: Object.values(collection);

	let index: number = array.length;

	while (--index) {
		let randIndex: number = baseRandom(0, index);
		const value = array[randIndex];

		array[randIndex] = array[index];
		array[index] = value;
	}

	return array;
};

const baseRandom = (lower: number, upper: number) => {
	return lower + Math.floor(Math.random() * (upper - lower + 1));
};
