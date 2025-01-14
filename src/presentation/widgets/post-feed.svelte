<script lang="ts">
	import * as m from '$lib/app/paraglide/messages';
	import { Pencil, Plus } from 'lucide-svelte';

	import { Button } from '$lib/components/ui/button';
	import { Post } from '$lib/widgets/post';
	import type { PostVModel, ReactiveStoreConfig } from '$lib/state/post';
	import { createReactivePostStore } from '$lib/state/post';
	import { InfiniteScroll } from 'infinite-scroll-svelte';
	import { Loader } from '$lib/components/ui/loader';

	let {
		title,
		openModifyPostDialog,
		editorMode = false,
		...remaindPostStoreConfig
	}: {
		editorMode?: boolean;
		title?: string;
		openModifyPostDialog?: (post?: PostVModel) => any;
	} & ReactiveStoreConfig = $props();

	let loading = $state(false);

	const store = createReactivePostStore(remaindPostStoreConfig);
	store.nextChunk().catch(console.error);
</script>

<section class="flex h-[85vh] min-w-full flex-col gap-6 rounded-3xl">
	<header class="flex w-full items-center justify-between">
		<div class="flex gap-4">
			<h3>{title}</h3>
			{#if editorMode}
				<Button variant="outline">
					<Pencil />
					{m.rename()}
				</Button>
			{/if}
		</div>

		{#if editorMode}
			<Button variant="default" onclick={() => openModifyPostDialog && openModifyPostDialog()}>
				<Plus />
				{m.add_post()}
			</Button>
		{/if}
	</header>

	<div class="relative size-full max-h-[75vh] rounded-3xl contain-paint">
		<div
			class="pointer-events-none absolute left-0 top-0 size-full bg-gradient-to-b from-transparent from-95% to-background"
		></div>
		{#if loading}
			<Loader />
		{/if}
		<InfiniteScroll
			class="grid size-full grid-cols-2 gap-4 overflow-y-auto pb-2 pr-2 xl:grid-cols-4"
			onPrev={async () => await store.prevChunk()}
			onNext={async () => await store.nextChunk()}
			onLock={() => (loading = true)}
			onUnlock={() => (loading = false)}
			thresholdPrevInPx={90}
			thresholdNextInPx={90}
			throttleInMs={50}
			promiseRejectTimeoutInSecs={10}
		>
			{#each store.allPosts as postData (postData.id)}
				<Post {...postData} {editorMode} />
			{/each}
		</InfiniteScroll>
	</div>
</section>
