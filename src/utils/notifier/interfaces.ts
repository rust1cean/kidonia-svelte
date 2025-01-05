export interface EventProvider<NotificationEvent> {
	subscribe<Arg>(event: NotificationEvent, subscriber: EventSubscriber<Arg>): this;
	notify<Arg>(event: NotificationEvent, ...args: Arg[]): Promise<this>;
	notifyAll<Arg>(...args: Arg[]): Promise<this>;
	clear(): this;
}

export interface OneEventProvider {
	subscribe<Arg>(subscriber: EventSubscriber<Arg>): this;
	notifyAll<Arg>(...args: Arg[]): Promise<this>;
	clear(): this;
}

export type EventSubscriber<Arg> = (...args: Arg[]) => any;
