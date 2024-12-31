export class Notifier<NotificationEvent> {
	constructor(private factory: Map<NotificationEvent, NotifierPipeline<any>> = new Map()) {}

	public selfDestroy() {
		this.factory.clear();
	}

	public subscribe<Item>(event: NotificationEvent, subscriber: NotificationSubscriber<Item>): this {
		if (!this.factory.has(event)) {
			this.factory.set(event, new NotifierPipeline());
		}
		this.factory.get(event)!.subscribe(subscriber);
		return this;
	}

	public async notify<Item>(notificationEvent: NotificationEvent, ...args: Item[]): Promise<this> {
		const pipeline = this.factory.get(notificationEvent);

		if (pipeline) {
			await pipeline.notifyAll(...args);
		}

		return this;
	}

	public async notifyAll<Item>(...args: Item[]): Promise<this> {
		const factory = this.factory.values();

		for (const pipeline of factory) {
			await pipeline.notifyAll(...args);
		}

		return this;
	}
}

export class NotifierPipeline<Item> {
	constructor(private pipeline: Array<NotificationSubscriber<Item>> = []) {}

	public subscribe(subscriber: NotificationSubscriber<Item>): this {
		this.pipeline.push(subscriber);
		return this;
	}

	public clear(): this {
		this.pipeline = [];
		return this;
	}

	public async notifyAll(...args: Item[]): Promise<this> {
		const pipeline = this.pipeline.values();

		for (const subscriber of pipeline) {
			await subscriber(...args);
		}

		return this;
	}
}

export type NotificationSubscriber<Item> = (...args: Item[]) => any;
