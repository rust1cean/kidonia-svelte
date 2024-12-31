import { onDestroy } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';
import { NotificationFactory, type Subscriber } from '../notifications';

export type StoreEvents = 'set' | 'remove';

export abstract class ReactiveStore<
	Key,
	Value extends { id: Key },
	ExtendedEvents extends string = never
> {
	protected store: SvelteMap<Key, Value>;
	protected notifications: NotificationFactory<StoreEvents | ExtendedEvents>;

	constructor(selfDestroy = () => {}) {
		this.store = new SvelteMap();
		this.notifications = new NotificationFactory();

		onDestroy(() => {
			this.store.clear();
			this.notifications.selfDestroy();
			selfDestroy();
		});
	}

	public get all(): MapIterator<Value> {
		return this.store.values();
	}

	public get size(): number {
		return this.store.size;
	}

	public subscribe<Item>(event: StoreEvents | ExtendedEvents, subscriber: Subscriber<Item>): this {
		this.notifications.subscribe(event, subscriber);
		return this;
	}

	public set(...values: Value[]): this {
		values.forEach((value) => this.store.set(value.id, value));
		this.notifications.notify('set', ...values);

		return this;
	}

	public remove(...ids: Key[]): this {
		ids.forEach((id) => this.store.delete(id));
		this.notifications.notify('remove', ...ids);

		return this;
	}

	public has(id: Key): boolean {
		return this.store.has(id);
	}
}
