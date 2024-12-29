<script lang="ts">
	import { type PostProps } from './index';
	import * as Drawer from '$lib/components/ui/drawer';

	import PostAuthor from './post-author.svelte';
	import PostBadges from './post-badges.svelte';
	import PostBottomSheet from './post-bottom-sheet.svelte';
	import PostGallery from './gallery.svelte';
	import PostDrawerContent from './post-drawer-content.svelte';

	const post: PostProps = $props();
</script>

<div
	class="flex size-full min-w-[16vmin] flex-col gap-2 rounded-3xl bg-secondary duration-150 hover:shadow-lg"
>
	<Drawer.Root>
		<Drawer.Trigger>
			<PostGallery {...post} />
		</Drawer.Trigger>
		<PostDrawerContent {...post} />
	</Drawer.Root>

	<div class="flex h-full flex-col gap-6 p-3">
		<div class="flex h-full flex-col gap-2">
			<h6 class="overflow-hidden text-ellipsis whitespace-nowrap">{post.title}</h6>
			{#if post.description}
				<p class="line-clamp-3 text-sm">{post.description}</p>
			{/if}
			<PostBadges {...post} />
		</div>
		<PostAuthor author={post.author} />
		<PostBottomSheet price={post.price} editorMode={post.editorMode} />
	</div>
</div>
