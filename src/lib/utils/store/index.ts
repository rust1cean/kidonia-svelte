import { onDestroy } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';
import { Notifier, type Subsriber } from '../notifier';

export type StoreEvents = 'set' | 'remove';

export abstract class Store<Key, Value extends { id: Key }, ExtendedEvents extends string = never> {
	protected map: SvelteMap<Key, Value>;
	protected notifier: Notifier<StoreEvents | ExtendedEvents>;

	constructor() {
		this.map = new SvelteMap();
		this.notifier = new Notifier();

		onDestroy(() => {
			this.map.clear();
			this.notifier.selfDestroy();
			this.onDestroy();
		});
	}

	protected abstract onDestroy(): any;

	public subscribe(event: StoreEvents | ExtendedEvents, subscriber: Subsriber): this {
		this.notifier.subscribe(event, subscriber);
		return this;
	}

	public set(...values: Value[]): this {
		values.forEach((value) => this.map.set(value.id, value));
		this.notifier.notify('set', ...values);

		return this;
	}

	public remove(...ids: Key[]): this {
		ids.forEach((id) => this.map.delete(id));
		this.notifier.notify('remove', ...ids);

		return this;
	}

	public has(id: Key): boolean {
		return this.map.has(id);
	}
}
