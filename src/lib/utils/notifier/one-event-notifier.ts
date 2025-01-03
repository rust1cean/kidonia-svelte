import { injectable } from 'inversify';
import type { EventSubscriber, OneEventProvider } from './interfaces';

@injectable()
export class OneEventNotifier implements OneEventProvider {
	constructor(private pipeline: Array<EventSubscriber<any>> = []) {}

	public subscribe<Arg>(subscriber: EventSubscriber<Arg>): this {
		this.pipeline.push(subscriber);
		return this;
	}

	public async notifyAll<Arg>(...args: Arg[]): Promise<this> {
		const pipeline = this.pipeline.values();

		for (const subscriber of pipeline) {
			await subscriber(...args);
		}

		return this;
	}

	public clear(): this {
		this.pipeline = [];
		return this;
	}
}
