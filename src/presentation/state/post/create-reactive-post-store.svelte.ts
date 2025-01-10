import type { Merge } from 'type-fest';
import type { PostVModel } from './model';
import { postContainer, TYPES } from '@/di/post-container';
import type { GetPostsPayload, GetPostsUseCase, SortBy } from '@/application/post';
import { detailedPostDtoToPostVModel } from './mapper';
import { createReactiveQueue } from '@/presentation/shared/reactive-collections';
import type { Identify } from '@/utils/types';
import type { FetchRange } from '@/domain/common/repository';

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

export const defaultFetchOptionsIfNeeded = (fetchOptions: ReactiveStoreConfig) => ({
	...fetchOptions,
	limit: fetchOptions.limit ?? POSTS_FETCH_LIMIT,
	offset: fetchOptions.offset ?? 0
});

export const createReactivePostStore = (fetchOptions: ReactiveStoreConfig) => {
	const options = defaultFetchOptionsIfNeeded(fetchOptions);
	const getPosts: GetPostsUseCase = postContainer.get<GetPostsUseCase>(TYPES.GetPostsUseCase);
	const store = createReactiveQueue<PostVModel>(REACTIVE_POST_STORE_SIZE_LIMIT);

	const reduceOffset = (by: number = options.limit) => {
		const newOffset = options.offset - by;
		options.offset = newOffset < 0 ? 0 : newOffset;
	}

	const increaseOffset = (by: number) => {
		options.offset += by;
	}

	const request = async (): Promise<PostVModel[]> => {
		const postEntities = await getPosts.execute(options);
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
			reduceOffset();
			const postModels = await request();
			store.pushBack(...postModels);

			return postModels;
		},

		async nextChunk(): Promise<PostVModel[]> {
			const postModels = await request();
			store.pushFront(...postModels);
			increaseOffset(postModels.length)

			return postModels;
		}
	};
};
