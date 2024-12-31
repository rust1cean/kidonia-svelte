import { fetchPosts, type FetchPostsPayload } from '$lib/api/post';
import { Store } from '$lib/utils/store';
import type { Id } from '$lib/utils/types';
import type { PostModel } from './post-model';

export class PostStore extends Store<Id, PostModel> {
	constructor() {
		super();

		this.subscribe<PostModel>('set', (...posts) => this.onNewPosts(...posts));
		this.subscribe<Id>('remove', (...ids) => this.onRemovePosts(...ids));
	}

	protected onDestroy() {}

	private onNewPosts(...posts: PostModel[]) {}

	private onRemovePosts(...ids: Id[]) {}

	public requestPosts(options: FetchPostsPayload = {}) {
		fetchPosts(options).then((posts) => {
			this.set(...posts);
		});
	}
}
