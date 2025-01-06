export const createReactiveQueue = <T>(size: number) => {
	const queue = $state<T[]>([]);

	return {
		get items() {
			return queue;
		},

		pushBack(...items: T[]) {
			const iLen = items.length;
			const qLen = queue.length;
			const diff = Math.abs(qLen - iLen);

			if (diff > 0) {
				queue.splice(iLen - diff, diff + 1);
			}

			queue.unshift(...items);
		},

		pushFront(...items: T[]) {
			const iLen = items.length;
			const qLen = queue.length;
			const diff = Math.abs(qLen - iLen);

			if (diff > 0) {
				queue.splice(0, diff + 1);
			}

			queue.push(...items);
		}
	};
};
