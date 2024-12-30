export type Subsriber = (...args: any[]) => any;

export class Notifier<NotificationEvent> {
	constructor(private subscribers: Map<NotificationEvent, Subsriber> = new Map()) {}

	public selfDestroy() {
		this.subscribers.clear();
	}

	public subscribe(event: NotificationEvent, subscriber: Subsriber): this {
		this.subscribers.set(event, subscriber);
		return this;
	}

	public async notify(pipelineEvent: NotificationEvent, ...args: any[]): Promise<this> {
		const subscribers = this.subscribers.entries();

		for (const [event, subscriber] of subscribers) {
			if (pipelineEvent === event) {
				await subscriber(...args);
			}
		}

		return this;
	}

	public async notifyAll(...args: any[]): Promise<this> {
		const subscribers = this.subscribers.values();

		for (const subscriber of subscribers) {
			await subscriber(...args);
		}

		return this;
	}
}
