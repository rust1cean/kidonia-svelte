import type { PostCategory } from '$lib/data/post/post-constants';
import { Notifier, type NotificationSubscriber } from '$lib/utils/notifications';
import type { Id } from '$lib/utils/types';
import { entityToModel } from './post-mapper';
import type { FetchPostsPayload } from './post-payload';
import { fetchPosts } from './post-service';

export type PostModel = {
	id: Id;
	author: {
		id: string | number;
		name: string;
		avatar?: string | null;
	};
	title: string;
	gallery: string[];
	description?: string | null;
	address?: string | null;
	category?: PostCategory | null;
	draft?: boolean | null;
	maxAge?: number | null;
	minAge?: number | null;
	phone: string;
	postcode?: number | null;
	price?: number | null;
	updatedAt?: string;
};

export type PostStoreEvent = 'set' | 'remove';

export class PostStore {
	constructor(
		private store = new Map<PostModel['id'], PostModel>(),
		private notifier = new Notifier<PostStoreEvent>()
	) {}

	public subscribe(event: PostStoreEvent, subscriber: NotificationSubscriber<PostModel>): this {
		this.notifier.subscribe(event, subscriber);
		return this;
	}

	public async requestPosts(options: FetchPostsPayload = {}): Promise<Array<PostModel> | Error> {
		const postEntities = await fetchPosts(options);

		const postModels = postEntities.map((postEntity) => {
			const postModel = entityToModel(postEntity);
			this.store.set(postModel.id, postModel);
			return postModel;
		});

		return postModels;
	}

	public getPosts();
}
