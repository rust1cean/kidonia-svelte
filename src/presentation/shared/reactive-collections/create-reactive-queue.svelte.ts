import { Segment } from '@/utils/segment';

export const createReactiveQueue = <T>(size: number) => {
	const queue = $state<T[]>([]);

	return {
		get items(): T[] {
			return queue;
		},

		get len(): number {
			return queue.length;
		},

		pushBack(...items: T[]): Segment | null {
			const iLen = items.length;
			const qLen = queue.length;
			const diff = Math.abs(size - qLen - iLen);

			let segment: Segment | null = null;

			if (diff > 0 && diff !== qLen) {
				segment = new Segment(qLen - diff, qLen);
				queue.splice(segment.start, segment.end);
			}
			queue.unshift(...items);

			return segment;
		},

		pushFront(...items: T[]): Segment | null {
			const iLen = items.length;
			const qLen = queue.length;
			const diff = Math.abs(size - qLen - iLen);

			let segment: Segment | null = null;

			if (diff > 0 && diff !== qLen) {
				segment = new Segment(0, diff);
				queue.splice(segment.start, segment.end);
			}
			queue.push(...items);

			return segment;
		}
	};
};
