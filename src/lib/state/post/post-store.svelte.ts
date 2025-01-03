import { inject } from 'inversify';
import { SvelteMap } from 'svelte/reactivity';
import type { PostId, PostVModel } from './post-model';
import { POST_TYPES, type PostProvider } from '$lib/data/post';

export class ReactivePostRepository {
	constructor(
		@inject(POST_TYPES.PostProvider) private store: PostProvider,
		private posts: SvelteMap<PostId, PostVModel> = new SvelteMap()
	) {}
}
