export const createReactiveQueue = <T>(size: number) => {
	const queue = $state<T[]>([]);

	return {
		get items(): T[] {
			return queue;
		},

		get len(): number {
			return queue.length;
		},

		pushBack(...items: T[]) {
			const iLen = items.length;
			const qLen = queue.length;
			const diff = Math.abs(size - qLen - iLen);

			let range;

			if (diff > 0) {
				range = { from: qLen - diff, to: qLen };
				queue.splice(range.from, range.to);
			}
			queue.unshift(...items);

			return range;
		},

		pushFront(...items: T[]) {
			const iLen = items.length;
			const qLen = queue.length;
			const diff = Math.abs(size - qLen - iLen);

			let range;

			if (diff > 0) {
				range = { from: 0, to: diff };
				queue.splice(range.from, range.to);
			}
			queue.push(...items);

			return range;
		}
	};
};

export const createReactiveKeyedQueue = <V extends { [key in string | number | symbol]: any }>(
	key: string | number | symbol,
	size: number
) => {
	let indices = new Set();
	const queue = createReactiveQueue<V>(size);

	const addDifferenceIndices = (...idx: any[]): Set<any> => {
		const idxSet = new Set(idx);
		const diff = idxSet.difference(indices);

		for (const idx of diff) {
			indices.add(idx);
		}

		return diff;
	};

	const getWithoutDuplicates = (withDuplicates: V[]): V[] => {
		const indices = addDifferenceIndices(...withDuplicates.map((item) => item[key]));
		return withDuplicates.filter((item) => indices.has(item[key]));
	};

	const dropIndicesByRange = ({ from, to }: { from: number; to: number }) => {
		const count = to - from;
		const which = [
			...Array(count)
				.keys()
				.map((i) => i + from)
		];
		indices = indices.difference(new Set(which));
	};

	return {
		get items(): V[] {
			return queue.items;
		},

		get len(): number {
			return queue.len;
		},

		pushBack(...items: V[]) {
			const dropRange = queue.pushBack(...getWithoutDuplicates(items));
			if (dropRange) {
				dropIndicesByRange(dropRange);
			}
		},

		pushFront(...items: V[]) {
			const dropRange = queue.pushFront(...getWithoutDuplicates(items));
			if (dropRange) {
				dropIndicesByRange(dropRange);
			}
		}
	};
};
