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

			if (diff > 0 && diff !== qLen) {
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

			if (diff > 0 && diff !== qLen) {
				range = { from: 0, to: diff };
				queue.splice(range.from, range.to);
			}
			queue.push(...items);

			return range;
		}
	};
};
