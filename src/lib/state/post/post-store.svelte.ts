import { SvelteMap } from 'svelte/reactivity';
import type { PostId, PostVModel } from './post-model';
import { type PostProvider } from '$lib/data/post';

export class ReactivePostStore<Store extends PostProvider> {
	constructor(
		private store: Store = localPostStore,
		private posts: SvelteMap<PostId, PostVModel> = new SvelteMap()
	) {}
}
