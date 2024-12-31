import type { ReactiveStore } from './reactive-store';

export class ReactiveSlice<Key, Value extends { id: Key }> {
	public slice: Value[];

	constructor(
		public store: ReactiveStore<Key, Value>,
		public from: number,
		public end: number
	) {
		this.slice = $derived(Array.from(store.all).slice(from, end));
	}
}
