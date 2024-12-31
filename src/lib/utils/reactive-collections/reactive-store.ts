import { onDestroy } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';
import { Notifier, type Subscriber } from '../notifications';
import type { Id } from '../types';

export type StoreEvents = 'set' | 'remove';

export abstract class ReactiveStore<
	Item extends { id: Id },
	ExtendedEvents extends string = never
> {
	protected store: SvelteMap<Item['id'], Item>;
	protected notifications: Notifier<StoreEvents | ExtendedEvents>;

	constructor(selfDestroy = () => {}) {
		this.store = new SvelteMap();
		this.notifications = new Notifier();

		onDestroy(() => {
			this.store.clear();
			this.notifications.selfDestroy();
			selfDestroy();
		});
	}

	public get items(): Item[] {
		return Array.from(this.store.values());
	}

	public get iterator(): MapIterator<Item> {
		return this.store.values();
	}

	public get size(): number {
		return this.store.size;
	}

	public subscribe<Item>(event: StoreEvents | ExtendedEvents, subscriber: Subscriber<Item>): this {
		this.notifications.subscribe(event, subscriber);
		return this;
	}

	public set(...values: Item[]): this {
		values.forEach((value) => this.store.set(value.id, value));
		this.notifications.notify('set', ...values);

		return this;
	}

	public remove(...ids: Array<Item['id']>): this {
		ids.forEach((id) => this.store.delete(id));
		this.notifications.notify('remove', ...ids);

		return this;
	}

	public has(id: Item['id']): boolean {
		return this.store.has(id);
	}
}
