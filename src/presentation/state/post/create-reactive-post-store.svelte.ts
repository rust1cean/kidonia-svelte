import type { Merge } from 'type-fest';
import type { PostVModel } from './post-model';
import type { FetchRange } from '@/domain/common';
import type { GetPostsPayload, GetPostsUseCase, SortBy } from '@/application/post';
import type { Identify } from '@/utils/types';
import { postContainer, TYPES } from '@/di/post-container';
import { detailedPostDtoToPostVModel } from './post-mappers';
import { createReactiveQueue } from '@/presentation/shared/reactive-collections';
import { Pagination } from '@/utils/pagination';

export const REACTIVE_POST_STORE_SIZE_LIMIT: number = 24;
export const POSTS_FETCH_LIMIT: number = 12;

export type ReactiveStoreConfig = Identify<
	Merge<
		GetPostsPayload,
		Partial<FetchRange> & {
			sortBy?: SortBy | null;
		}
	>
>;

export const createReactivePostStore = (cfg: ReactiveStoreConfig) => {
	const limit = cfg.limit ?? POSTS_FETCH_LIMIT;
	const pagination = new Pagination(limit);

	const getPosts: GetPostsUseCase = postContainer.get<GetPostsUseCase>(TYPES.GetPostsUseCase);
	const store = createReactiveQueue<PostVModel>(REACTIVE_POST_STORE_SIZE_LIMIT);

	const request = async (range: FetchRange, cfg: GetPostsPayload): Promise<PostVModel[]> => {
		const postEntities = await getPosts.execute(range, cfg);
		const postModels = postEntities.map(detailedPostDtoToPostVModel);

		return postModels;
	};

	return {
		get allPosts(): PostVModel[] {
			return store.items;
		},

		get len(): number {
			return store.items.length;
		},

		async prevChunk(): Promise<PostVModel[]> {
			const prevPage = pagination.prevPage(store.len);

			if (prevPage.limit <= 0) {
				return Promise.resolve([]);
			}

			const postModels = await request(prevPage, cfg);

			store.pushBack(...postModels);
			pagination.back(postModels.length);

			return postModels;
		},

		async nextChunk(): Promise<PostVModel[]> {
			const postModels = await request(pagination.fromCurrPage, cfg);

			store.pushFront(...postModels);
			pagination.next(postModels.length);

			return postModels;
		}
	};
};
