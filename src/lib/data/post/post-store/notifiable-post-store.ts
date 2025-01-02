import type { Id, Identify } from '$lib/utils/types';
import type { SetOptional } from 'type-fest';
import { inject, injectable } from 'inversify';
import type { PostId, PostModel } from '../post-model';
import type { PostFilters, PostProvider } from './';
import { Notifier } from '$lib/utils/notifier';
import { POST_DEPENDENCY_ID } from '../post-constants';
import type { FetchRange } from '$lib/data/types';

export type PostStoreRequestEvent = 'on-request' | 'on-reject' | 'on-response';
export type PostStoreUpdateEvent = 'on-drop';
export type PostStoreEvent = Identify<PostStoreRequestEvent | PostStoreUpdateEvent>;

@injectable()
export class NotifiablePostStore extends Notifier<PostStoreEvent> implements PostProvider {
	constructor(@inject(POST_DEPENDENCY_ID.PostProvider) private store: PostProvider) {
		super();
	}

	[Symbol.iterator](): MapIterator<PostModel> {
		return this.store[Symbol.iterator]();
	}

	public get all(): Array<PostModel> {
		return this.store.all;
	}

	public async request(options: PostFilters = {}): Promise<Array<PostModel> | Error> {
		this.notify('on-request');
		try {
			const postModels = await this.store.request(options);
			this.notify('on-response', postModels);

			return postModels;
		} catch (error) {
			this.notify('on-reject', error);
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
		this.notify('on-drop', id);
		return this;
	}
}
