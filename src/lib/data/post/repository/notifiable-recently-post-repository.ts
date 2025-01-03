import { inject } from 'inversify';
import { POST_TYPES } from '../constants';
import type {
	NotifiablePostProvider,
	PostFilters,
	PostRepositoryEvent
} from './interfaces';
import type { PostId, PostModel } from '../../../service/post/model';
import type { SetOptional } from 'type-fest';
import type { FetchRange } from '$lib/api/types';
import type { Id } from '$lib/utils/types';
import type { EventSubscriber } from '$lib/utils/notifier';

export class NotifiableRecentlyPostRepository {
	constructor(
		@inject(POST_TYPES.NotifiablePostProvider) private store: NotifiablePostProvider,
		private posts: Array<PostModel> = []
	) {
		this.store.subscribe('on-request-response', async (...newPosts: PostModel[]) => {
			this.posts = await this.sortByDate(newPosts);
		});
	}

	private async sortByDate(posts: PostModel[]): Promise<PostModel[]> {
		return new Promise((res) => {
			res(posts.sort((a: any, b: any) => b.updatedAt - a.updatedAt))
		});
	}

	public subscribe<Arg>(event: PostRepositoryEvent, subscriber: EventSubscriber<Arg>): this {
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
