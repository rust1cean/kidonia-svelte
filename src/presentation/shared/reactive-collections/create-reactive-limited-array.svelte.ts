import type { ReactiveStore } from '.';

export const createReactiveLimitedArray = <T>(
	fixedSizeLimit: number,
	index: number = 0
): ReactiveStore<T> => {
	console.assert(fixedSizeLimit > 0, 'Fixed array size must be more than 0.');

	let items = $state<T[]>(new Array(fixedSizeLimit));

	return {
		get all(): T[] {
			return items.filter(item => item != undefined);
		},

		write(...addtional: T[]) {
			for (const item of addtional) {
				items[index] = item;
				index = index >= fixedSizeLimit ? fixedSizeLimit : index + 1;
			}
			index = index;
		},

		clear() {
			index = 0;
			items = [];
		}
	};
};
