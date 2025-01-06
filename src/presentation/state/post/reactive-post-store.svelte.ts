import type { Merge } from 'type-fest';
import type { PostVModel } from './model';
import { postContainer, TYPES } from '@/di/post-container';
import type { GetPostsPayload, GetPostsUseCase, SortBy } from '@/application/post';
import { detailedPostDtoToPostVModel } from './mapper';
import { createReactiveLimitedArray } from '@/presentation/shared/reactive-collections';
import type { Identify } from '@/utils/types';
import type { FetchRange } from '@/domain/common/repository';

export const REACTIVE_POST_STORE_SIZE_LIMIT: number = 32;

export type ReactiveStoreConfig = Identify<Merge<GetPostsPayload, Partial<FetchRange> & {
	sortBy?: SortBy | null
}>>

export const createReactivePostStore = (fetchOptions: ReactiveStoreConfig) => {
	const getPosts: GetPostsUseCase = postContainer.get<GetPostsUseCase>(TYPES.GetPostsUseCase);
	const store = createReactiveLimitedArray<PostVModel>(REACTIVE_POST_STORE_SIZE_LIMIT);

	return {
		get allPosts(): PostVModel[] {
			return store.all;
		},

		async requestPosts(fetchRange: { offset: number; limit: number }): Promise<PostVModel[]> {
			const postEntities = await getPosts.execute({
				...fetchOptions,
				...fetchRange
			});
			const postModels = postEntities.map(detailedPostDtoToPostVModel);

			store.write(...postModels);

			return postModels;
		}
	};
};
