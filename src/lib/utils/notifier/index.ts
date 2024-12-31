export class Notifier<NotificationEvent> {
	constructor(private notifier: Map<NotificationEvent, NotifierPipeline<any>> = new Map()) {}

	public selfDestroy() {
		this.notifier.clear();
	}

	public subscribe<Item>(event: NotificationEvent, subscriber: NotificationSubscriber<Item>): this {
		if (!this.notifier.has(event)) {
			this.notifier.set(event, new NotifierPipeline());
		}
		this.notifier.get(event)!.subscribe(subscriber);
		return this;
	}

	public async notify<Item>(notificationEvent: NotificationEvent, ...args: Item[]): Promise<this> {
		const pipeline = this.notifier.get(notificationEvent);

		if (pipeline) {
			await pipeline.notifyAll(...args);
		}

		return this;
	}

	public async notifyAll<Item>(...args: Item[]): Promise<this> {
		const notifier = this.notifier.values();

		for (const pipeline of notifier) {
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
