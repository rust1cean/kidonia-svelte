<script lang="ts">
	import * as m from '$lib/app/paraglide/messages';
	import { Pencil, Plus } from 'lucide-svelte';

	import PartialView from '$lib/components/partial-view.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Post } from '$lib/widgets/post';
	import type { PostVModel } from '$lib/state/post';
	import { reactivePostStore } from '$lib/state/post';

	let {
		title,
		openModifyPostDialog,
		editorMode = false,
	}: {
		editorMode?: boolean;
		title?: string;
		requestPosts?: () => Promise<PostVModel>;
		openModifyPostDialog?: (post?: PostVModel) => any;
	} = $props();

	let loaded: boolean = $state(false);
</script>

<section class="flex h-[85vh] min-w-full flex-col gap-6 rounded-3xl">
	{#if loaded}
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
	{/if}

	<PartialView
		wrapperClassName="size-full rounded-2xl"
		scrollAreaClassName="pr-2"
		itemsClassName="grid xl:grid-cols-4 grid-cols-2 gap-4"
		items={reactivePostStore.allPosts}
		onRequestItems={(range) => reactivePostStore.requestPosts(range)}
		onLoad={() => (loaded = true)}
	>
		<div
			class="pointer-events-none absolute left-0 top-0 size-full bg-gradient-to-b from-transparent from-95% to-background"
		>
			<!-- Gradient -->
		</div>
		{#snippet component(postData)}
			<Post {...postData} {editorMode} />
		{/snippet}
	</PartialView>
</section>
