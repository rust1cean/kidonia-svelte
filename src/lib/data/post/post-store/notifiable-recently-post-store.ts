import { inject } from 'inversify';
import { POST_DEPENDENCY_ID } from '../post-constants';
import type {
	NotifiablePostProvider,
	PostFilters,
	PostStoreEvent
} from './post-store-interfaces';
import type { PostId, PostModel } from '../post-model';
import type { SetOptional } from 'type-fest';
import type { FetchRange } from '$lib/data/types';
import type { Id } from '$lib/utils/types';
import type { EventSubscriber } from '$lib/utils/notifier';

export class NotifiableRecentlyPostStore {
	constructor(
		@inject(POST_DEPENDENCY_ID.NotifiablePostProvider) private store: NotifiablePostProvider,
		private posts: Array<PostModel> = []
	) {
		this.store.subscribe<PostModel>('on-response', async (...newPosts) => {
			this.posts = await this.sortByDate(newPosts);
		});
	}

	private async sortByDate(posts: PostModel[]): Promise<PostModel[]> {
		return new Promise((res) => {
			res(posts.sort((a: any, b: any) => b.updatedAt - a.updatedAt))
		});
	}

	public subscribe<Arg>(event: PostStoreEvent, subscriber: EventSubscriber<Arg>): this {
		this.store.subscribe(event, subscriber);
		return this;
	}

	public get allPosts(): Array<PostModel> {
		return this.posts;
	}

	public async request(options: PostFilters = {}): Promise<Array<PostModel> | Error> {
		return this.store.request(options);
	}

	public getSlice(slice: SetOptional<FetchRange, 'limit'>) {
		return this.store.getSlice(slice);
	}

	public getSingle(id: PostId): PostModel | undefined {
		return this.store.getSingle(id);
	}

	public drop(id: Id): this {
		this.store.drop(id);
		return this;
	}
}
