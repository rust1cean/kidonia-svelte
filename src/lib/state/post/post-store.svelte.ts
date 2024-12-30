import { Store } from '$lib/utils/store';
import type { Id } from '$lib/utils/types';
import type { PostModel } from './post-model';

export class PostStore extends Store<Id, PostModel> {
	constructor() {
		super();

		this.subscribe('set', (...posts) => this.onNewPosts(...posts));
		this.subscribe('remove', (...posts) => this.onRemovePosts(...posts));
	}

	protected onDestroy() {}

	private onNewPosts(...posts: PostModel[]) {}

	private onRemovePosts(...ids: Id[]) {}
}
