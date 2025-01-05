import type { ReactiveStore } from '.';

export abstract class ReactiveLimitedArray<T> implements ReactiveStore<T> {
	protected abstract items: T[];

	constructor(
		private sizeLimit: number,
		private index: number = 0
	) {}

	[Symbol.iterator](): Iterator<T> {
		return this.items[Symbol.iterator]();
	}

	public get all(): T[] {
		return this.items;
	}

	public write(...items: T[]): this {
		let { index, sizeLimit } = this;

		for (const item of items) {
			this.items[index] = item;
			index = index >= sizeLimit ? sizeLimit : index + 1;
		}
		this.index = index;

		return this;
	}

	public clear(): this {
		this.index = 0;
		this.items = [];
		return this;
	}
}
