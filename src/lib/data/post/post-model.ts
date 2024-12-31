import { POSTS_PER_ONCE, type PostCategory } from '$lib/data/post/post-constants';
import { ArithmeticMean } from '$lib/utils/arithmetic-mean';
import { Notifier } from '$lib/utils/notifier';
import type { Id, Identify } from '$lib/utils/types';
import type { SetOptional } from 'type-fest';
import type { FetchRange } from '../types';
import type { FilterPostsPayload } from './post-payload';
import { entityToModel } from './post-mapper';
import { fetchPosts } from './post-service';

export type PostModel = {
	id: Id;
	author: {
		id: string | number;
		name: string;
		avatar?: string | null;
	};
	title: string;
	gallery: string[];
	phone: string;
	description?: string | null;
	address?: string | null;
	category?: PostCategory | null;
	draft?: boolean | null;
	maxAge?: number | null;
	minAge?: number | null;
	postcode?: number | null;
	price?: number | null;
	updatedAt?: string;
};

export type PostStoreRequestEvent = 'on-request' | 'on-reject' | 'on-response';
export type PostStoreUpdateEvent = 'on-set' | 'on-drop';
export type PostStoreEvent = Identify<PostStoreRequestEvent | PostStoreUpdateEvent>;

export class PostStore extends Notifier<PostStoreEvent> {
	constructor(
		private store = new Map<PostModel['id'], PostModel>(),
		private requestRange = {
			offset: 0,
			limit: ArithmeticMean.from(POSTS_PER_ONCE)
		}
	) {
		super();
	}

	[Symbol.iterator](): MapIterator<PostModel> {
		return this.store.values();
	}

	public get all(): Array<PostModel> {
		return Array.from(this[Symbol.iterator]());
	}

	public async request(
		options: SetOptional<FilterPostsPayload, 'offset' | 'limit'> = {}
	): Promise<Array<PostModel> | Error> {
		this.notify('on-request');

		options.offset ??= this.requestRange.offset;
		options.limit ??= this.requestRange.limit.intArithmeticMean;

		const postEntities = await fetchPosts(options as FilterPostsPayload).catch((error) => {
			this.notify('on-reject', error);
			throw error;
		});

		this.requestRange.limit.recalculate(options.limit);

		const postModels = postEntities.map((postEntity) => {
			const postModel = entityToModel(postEntity);
			this.store.set(postModel.id, postModel);
			return postModel;
		});

		this.notify('on-set', postModels);
		this.notify('on-response', postModels);

		return postModels;
	}

	private async requestIfNeeded(): Promise<void | Error> {
		const {
			store,
			requestRange: { offset, limit }
		} = this;

		const diff = store.size - offset;
		const averageRequests = limit.intArithmeticMean;

		if (diff > averageRequests) {
			this.request();
		}
	}

	public getMany({ offset, limit }: { offset: FetchRange['offset']; limit?: FetchRange['limit'] }) {
		if (!limit) {
			limit = this.requestRange.limit.intArithmeticMean;
		}
		this.requestIfNeeded().catch(console.error);

		return this.all.slice(offset, limit);
	}

	public getSingle(id: PostModel['id']): PostModel | undefined {
		return this.store.get(id);
	}

	public drop(id: Id): this {
		this.store.delete(id);
		this.notify('on-drop', id);
		return this;
	}
}
