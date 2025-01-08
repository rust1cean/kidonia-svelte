import type { Merge } from 'type-fest';
import type { PostVModel } from './model';
import { postContainer, TYPES } from '@/di/post-container';
import type { GetPostsPayload, GetPostsUseCase, SortBy } from '@/application/post';
import { detailedPostDtoToPostVModel } from './mapper';
import { createReactiveQueue } from '@/presentation/shared/reactive-collections';
import type { Identify } from '@/utils/types';
import type { FetchRange } from '@/domain/common/repository';

export const REACTIVE_POST_STORE_SIZE_LIMIT: number = 16;
export const POSTS_FETCH_LIMIT: number = 4;

export type ReactiveStoreConfig = Identify<
	Merge<
		GetPostsPayload,
		Partial<FetchRange> & {
			sortBy?: SortBy | null;
		}
	>
>;

export const defaultFetchOptionsIfNeeded = (
	fetchOptions: ReactiveStoreConfig
) => ({
	...fetchOptions,
	limit: fetchOptions.limit ?? POSTS_FETCH_LIMIT,
	offset: fetchOptions.offset ?? 0
});

export const createReactivePostStore = (fetchOptions: ReactiveStoreConfig) => {
	fetchOptions = defaultFetchOptionsIfNeeded(fetchOptions);

	const getPosts: GetPostsUseCase = postContainer.get<GetPostsUseCase>(TYPES.GetPostsUseCase);
	const store = createReactiveQueue<PostVModel>(REACTIVE_POST_STORE_SIZE_LIMIT);

	return {
		get allPosts(): PostVModel[] {
			return store.items;
		},

		get len(): number {
			return store.items.length;
		},

		async requestPosts(fetchRange: Partial<FetchRange> = {}): Promise<PostVModel[]> {
			fetchRange.offset ??= fetchOptions.offset;
			fetchRange.limit ??= fetchOptions.limit;

			const postEntities = await getPosts.execute({
				...(fetchOptions as FetchRange),
				...fetchRange
			});
			const postModels = postEntities.map(detailedPostDtoToPostVModel);

			store.pushFront(...postModels);
			fetchOptions.offset! += postModels.length;

			return postModels;
		}
	};
};
