import { fetchPosts, type FetchPostsPayload } from '$lib/api/post';
import { ReactiveStore } from '$lib/utils/reactive-collections';
import type { Id } from '$lib/utils/types';
import { entityToModel } from './post-mapper';
import type { PostModel } from './post-model';

export class PostStore extends ReactiveStore<Id, PostModel> {
	public requestPosts(options: FetchPostsPayload = {}) {
		fetchPosts(options)
			.then((posts) => {
				this.set(...posts.map(entityToModel));
			})
			.catch((error) => {
				console.error('Failed to fetch posts.');
				throw error;
			});
	}
}
