import { inject, injectable } from 'inversify';
import type { EventProvider, EventSubscriber, OneEventProvider } from './interfaces';
import { NOTIFIER_TYPES } from './constants';

@injectable()
export class EventNotifier<NotificationEvent> implements EventProvider<NotificationEvent> {
	constructor(
		@inject(NOTIFIER_TYPES.OneEventProviderFactory)
		private providerFactory: () => OneEventProvider,
		private notifier: Map<NotificationEvent, OneEventProvider> = new Map()
	) {}

	public subscribe<OneEvent extends NotificationEvent, Arg>(
		event: OneEvent,
		subscriber: EventSubscriber<Arg>
	): this {
		let provider: OneEventProvider | undefined = this.notifier.get(event);

		if (!provider) {
			provider = this.providerFactory();
			this.notifier.set(event, provider);
		}
		provider.subscribe(subscriber);

		return this;
	}

	public async notify<Arg>(event: NotificationEvent, ...args: Arg[]): Promise<this> {
		const pipeline = this.notifier.get(event);

		if (pipeline) {
			await pipeline.notifyAll(...args);
		}

		return this;
	}

	public async notifyAll<Arg>(...args: Arg[]): Promise<this> {
		const notifier = this.notifier.values();

		for (const pipeline of notifier) {
			await pipeline.notifyAll(...args);
		}

		return this;
	}

	public clear(): this {
		this.notifier.clear();
		return this;
	}
}
