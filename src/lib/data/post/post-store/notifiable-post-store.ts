import { inject, injectable } from 'inversify';
import type { SetOptional } from 'type-fest';
import type { Id } from '$lib/utils/types';
import type { PostId, PostModel } from '../post-model';
import {
	type NotifiablePostProvider,
	type PostFilters,
	type PostProvider,
	type PostStoreEvent
} from './';
import { POST_DEPENDENCY_ID } from '../post-constants';
import type { FetchRange } from '$lib/data/types';
import { type EventProvider, type EventSubscriber } from '$lib/utils/notifier';

@injectable()
export class NotifiablePostStore implements NotifiablePostProvider {
	constructor(
		@inject(POST_DEPENDENCY_ID.PostProvider) private store: PostProvider,
		@inject(POST_DEPENDENCY_ID.EventProvider) private notifier: EventProvider<PostStoreEvent>
	) {}

	public subscribe<Arg>(event: PostStoreEvent, subscriber: EventSubscriber<Arg>): this {
		this.notifier.subscribe(event, subscriber);
		return this;
	}

	public async notify<Arg>(event: PostStoreEvent, ...args: Arg[]): Promise<this> {
		this.notifier.notify(event, ...args);
		return this;
	}

	public async notifyAll<Arg>(...args: Arg[]): Promise<this> {
		this.notifier.notifyAll(...args);
		return this;
	}

	public get allPosts(): Array<PostModel> {
		return this.store.allPosts;
	}

	public async request(options: PostFilters = {}): Promise<Array<PostModel> | Error> {
		this.notifier.notify('on-request');
		try {
			const postModels = await this.store.request(options);
			this.notifier.notify('on-response', postModels);

			return postModels;
		} catch (error) {
			this.notifier.notify('on-reject', error);
			throw error;
		}
	}

	public getSlice(slice: SetOptional<FetchRange, 'limit'>) {
		return this.store.getSlice(slice);
	}

	public getSingle(id: PostId): PostModel | undefined {
		return this.store.getSingle(id);
	}

	public drop(id: Id): this {
		this.store.drop(id);
		this.notifier.notify('on-drop', id);
		return this;
	}
}
