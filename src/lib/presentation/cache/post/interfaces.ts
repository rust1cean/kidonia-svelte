import type { SetOptional } from 'type-fest';
import type { FilterPostsPayload } from '../payload';
import type { PostId, PostModel } from '../model';
import type { FetchRange } from '$lib/repository/types';
import type { Id, Identify } from '$lib/utils/types';
import { type EventSubscriber } from '$lib/utils/notifier';

export type PostFilters = SetOptional<FilterPostsPayload, 'offset' | 'limit'>;

export interface PostProvider {
	get allPosts(): Array<PostModel>;
	request(options: PostFilters): Promise<Array<PostModel> | Error>;
	getSlice(slice: SetOptional<FetchRange, 'limit'>): Array<PostModel>;
	getSingle(id: PostId): PostModel | undefined;
	drop(id: Id): this;
}

export type PostRepositoryRequestEvent = 'on-request' | 'on-request-reject' | 'on-request-response';
export type PostRepositoryUpdateEvent = 'on-drop';
export type PostRepositoryEvent = Identify<PostRepositoryRequestEvent | PostRepositoryUpdateEvent>;

export interface NotifiablePostProvider extends PostProvider {
	subscribe<Arg>(event: PostRepositoryEvent, subscriber: EventSubscriber<Arg>): this;
	notify<Arg>(event: PostRepositoryEvent, ...args: Arg[]): Promise<this>;
	notifyAll<Arg>(...args: Arg[]): Promise<this>;
}
