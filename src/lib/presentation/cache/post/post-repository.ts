import { POSTS_PER_ONCE } from '$lib/repository/post/constants';
import type { Id } from '$lib/utils/types';
import { ArithmeticMean } from '$lib/utils/arithmetic-mean';
import type { SetOptional } from 'type-fest';
import { injectable } from 'inversify';
import type { PostId, PostModel } from '../model';
import type { FilterPostsPayload } from '../payload';
import { fetchPosts } from '../service';
import { entityToModel } from '../mapper';
import type { PostFilters, PostProvider } from '.';

@injectable()
export class PostRepository implements PostProvider {
	private requestRange: { offset: number; limit: ArithmeticMean };

	constructor(protected store: Map<PostId, PostModel> = new Map()) {
		this.requestRange = {
			offset: 0,
			limit: ArithmeticMean.from(POSTS_PER_ONCE)
		};
	}

	[Symbol.iterator](): MapIterator<PostModel> {
		return this.store.values();
	}

	public get allPosts(): Array<PostModel> {
		return Array.from(this[Symbol.iterator]());
	}

	public async request(
		options: SetOptional<FilterPostsPayload, 'offset' | 'limit'> = {}
	): Promise<Array<PostModel> | Error> {
		try {
			options.offset ??= this.requestRange.offset;
			options.limit ??= this.requestRange.limit.intArithmeticMean;

			const postEntities = await fetchPosts(options as FilterPostsPayload);

			this.requestRange.offset += postEntities.length
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

	public getSlice({ offset, limit }: PostFilters): PostModel[] {
		offset ??= this.requestRange.offset
		if (!limit) {
			limit = this.requestRange.limit.intArithmeticMean;
		}

		this.requestIfNeeded().catch(console.error);

		return this.allPosts.slice(offset, limit);
	}

	public getSingle(id: PostId): PostModel | undefined {
		return this.store.get(id);
	}

	public drop(id: Id): this {
		this.store.delete(id);
		return this;
	}
}
