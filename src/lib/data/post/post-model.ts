import { POSTS_PER_ONCE, type PostCategory } from '$lib/data/post/post-constants';
import { ArithmeticMean } from '$lib/utils/arithmetic-mean';
import { Notifier } from '$lib/utils/notifier';
import type { Id } from '$lib/utils/types';
import type { SetOptional } from 'type-fest';
import type { FetchRange } from '../types';
import type { FetchPostsPayload } from './post-payload';
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

export type PostStoreEvent = 'on-request' | 'on-set' | 'on-remove';

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

	public get allPosts(): Array<PostModel> {
		return Array.from(this[Symbol.iterator]());
	}

	public async requestPosts(
		options: SetOptional<FetchPostsPayload, 'offset' | 'limit'> = {}
	): Promise<Array<PostModel> | Error> {
		options.offset ??= this.requestRange.offset;
		options.limit ??= this.requestRange.limit.intArithmeticMean;

		const postEntities = await fetchPosts(options as FetchPostsPayload);
		this.requestRange.limit.recalculate(options.limit);

		const postModels = postEntities.map((postEntity) => {
			const postModel = entityToModel(postEntity);
			this.store.set(postModel.id, postModel);
			return postModel;
		});

		return postModels;
	}

	private async requestPostsIfNeeded(): Promise<void | Error> {
		const {
			store,
			requestRange: { offset, limit }
		} = this;

		const diff = store.size - offset;
		const averageRequests = limit.intArithmeticMean;

		if (diff > averageRequests) {
			this.requestPosts();
		}
	}

	public getPosts({
		offset,
		limit
	}: {
		offset: FetchRange['offset'];
		limit?: FetchRange['limit'];
	}) {
		if (!limit) {
			limit = this.requestRange.limit.intArithmeticMean;
		}
		this.requestPostsIfNeeded().catch(console.error);

		return this.allPosts.slice(offset, limit);
	}

	public getPostById(id: PostModel['id']): PostModel | undefined {
		return this.store.get(id);
	}
}
