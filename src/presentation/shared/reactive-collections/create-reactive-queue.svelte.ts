export const createReactiveQueue = <T>(size: number) => {
	const queue = $state<T[]>([]);

	return {
		get items(): T[] {
			return queue;
		},

		get len(): number {
			return queue.length
		},

		pushBack(...items: T[]) {
			const iLen = items.length;
			const qLen = queue.length;
			const diff = Math.abs(size - qLen - iLen);

			if (diff > 0) {
				queue.splice(qLen - diff, qLen);
			}

			queue.unshift(...items);
		},

		pushFront(...items: T[]) {
			const iLen = items.length;
			const qLen = queue.length;
			const diff = Math.abs(size - qLen - iLen);

			if (diff > 0) {
				queue.splice(0, diff);
			}

			queue.push(...items);
		}
	};
};

