import { SvelteMap } from 'svelte/reactivity';
import type { PostId, PostVModel } from './post-model';
import { localPostStore, type LocalPostStore } from '$lib/data/post';

export class ReactivePostStore<LocalStore extends LocalPostStore> {
	constructor(
		private store: LocalStore = localPostStore,
		private posts: SvelteMap<PostId, PostVModel> = new SvelteMap()
	) {}
}
