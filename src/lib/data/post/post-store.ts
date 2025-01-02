import { POSTS_PER_ONCE, POST_DEPENDENCY_ID } from '$lib/data/post/post-constants';
import type { Id, Identify } from '$lib/utils/types';
import { ArithmeticMean } from '$lib/utils/arithmetic-mean';
import { Notifier } from '$lib/utils/notifier';
import type { SetOptional } from 'type-fest';
import type { FetchRange } from '../types';
import type { FilterPostsPayload } from './post-payload';
import { entityToModel } from './post-mapper';
import { fetchPosts } from './post-service';
import type { PostId, PostModel } from './post-model';
import { inject, injectable } from 'inversify';

type PostFilters = SetOptional<FilterPostsPayload, 'offset' | 'limit'>;

export interface PostProvider {
	[Symbol.iterator](): MapIterator<PostModel>;
	get all(): Array<PostModel>;
	request(options: PostFilters): Promise<Array<PostModel> | Error>;
	getSlice(slice: SetOptional<FetchRange, 'limit'>): Array<PostModel>;
	getSingle(id: PostId): PostModel | undefined;
	drop(id: Id): this;
}

@injectable()
export class PostStore implements PostProvider {
	constructor(
		private store: Map<PostId, PostModel> = new Map(),
		private requestRange: { offset: number; limit: ArithmeticMean } = {
			offset: 0,
			limit: ArithmeticMean.from(POSTS_PER_ONCE)
		}
	) {}

	[Symbol.iterator](): MapIterator<PostModel> {
		return this.store.values();
	}

	public get all(): Array<PostModel> {
		return Array.from(this[Symbol.iterator]());
	}

	public async request(
		options: SetOptional<FilterPostsPayload, 'offset' | 'limit'> = {}
	): Promise<Array<PostModel> | Error> {
		try {
			options.offset ??= this.requestRange.offset;
			options.limit ??= this.requestRange.limit.intArithmeticMean;

			const postEntities = await fetchPosts(options as FilterPostsPayload);

			this.requestRange.limit.recalculate(options.limit);

			const postModels = postEntities.map((postEntity) => {
				const postModel = entityToModel(postEntity);
				this.store.set(postModel.id, postModel);
				return postModel;
			});

			return postModels;
		} catch (error) {
			throw error;
		}
	}

	private async requestIfNeeded(): Promise<void | Error> {
		const {
			store,
			requestRange: { offset, limit }
		} = this;

		const postsRemaining = store.size - offset;
		const averagePostsLimit = limit.intArithmeticMean;

		if (postsRemaining > averagePostsLimit) {
			this.request();
		}
	}

	public getSlice({
		offset,
		limit
	}: {
		offset: FetchRange['offset'];
		limit?: FetchRange['limit'];
	}): PostModel[] {
		if (!limit) {
			limit = this.requestRange.limit.intArithmeticMean;
		}
		this.requestIfNeeded().catch(console.error);

		return this.all.slice(offset, limit);
	}

	public getSingle(id: PostId): PostModel | undefined {
		return this.store.get(id);
	}

	public drop(id: Id): this {
		this.store.delete(id);
		return this;
	}
}

export const postStore = new PostStore();

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

export const notifiablePostStore = new NotifiablePostStore(postStore);
