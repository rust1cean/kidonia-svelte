import { inject } from 'inversify';
import { SvelteMap } from 'svelte/reactivity';
import type { PostId, PostVModel } from './post-model';
import { POST_DEPENDENCY_ID, type PostProvider } from '$lib/data/post';

export class ReactivePostStore {
	constructor(
		@inject(POST_DEPENDENCY_ID.PostProvider) private store: PostProvider,
		private posts: SvelteMap<PostId, PostVModel> = new SvelteMap()
	) {}
}
