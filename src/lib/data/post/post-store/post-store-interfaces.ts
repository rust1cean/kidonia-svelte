import type { SetOptional } from 'type-fest';
import type { FilterPostsPayload } from '../post-payload';
import type { PostId, PostModel } from '../post-model';
import type { FetchRange } from '$lib/data/types';
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

export type PostStoreRequestEvent = 'on-request' | 'on-reject' | 'on-response';
export type PostStoreUpdateEvent = 'on-drop';
export type PostStoreEvent = Identify<PostStoreRequestEvent | PostStoreUpdateEvent>;

export interface NotifiablePostProvider extends PostProvider {
	subscribe<Arg>(event: PostStoreEvent, subscriber: EventSubscriber<Arg>): this;
	notify<Arg>(event: PostStoreEvent, ...args: Arg[]): Promise<this>;
	notifyAll<Arg>(...args: Arg[]): Promise<this>;
}
