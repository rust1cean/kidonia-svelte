import type { Id } from '../types';
import type { ReactiveStore } from './reactive-store';

export class ReactiveSlice<Value extends { id: Id }> {
	public slice: Value[];

	constructor(
		public store: ReactiveStore<Value>,
		public from: number = 0,
		public end: number = Infinity
	) {
		this.slice = $derived(store.items.slice(from, end));
	}

	[Symbol.iterator]() {
		return this.slice[Symbol.iterator]();
	}
}
