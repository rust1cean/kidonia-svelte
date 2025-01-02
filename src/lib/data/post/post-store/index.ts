import type { SetOptional } from 'type-fest';
import type { FilterPostsPayload } from '../post-payload';
import type { PostId, PostModel } from '../post-model';
import type { FetchRange } from '$lib/data/types';
import type { Id } from '$lib/utils/types';

export type PostFilters = SetOptional<FilterPostsPayload, 'offset' | 'limit'>;

export interface PostProvider {
	[Symbol.iterator](): MapIterator<PostModel>;
	get all(): Array<PostModel>;
	request(options: PostFilters): Promise<Array<PostModel> | Error>;
	getSlice(slice: SetOptional<FetchRange, 'limit'>): Array<PostModel>;
	getSingle(id: PostId): PostModel | undefined;
	drop(id: Id): this;
}

export * from './post-store';
export * from './notifiable-post-store';
