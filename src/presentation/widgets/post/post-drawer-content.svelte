<script lang="ts">
	import { type PostProps } from './index';
	import * as Drawer from '$lib/components/ui/drawer';

	import PostAuthor from './post-author.svelte';
	import PostBadges from './post-badges.svelte';
	import PostBottomSheet from './post-bottom-sheet.svelte';
	import PostGallery from './gallery.svelte';

	const props: PostProps = $props();
</script>

<Drawer.Content class="left-[30vw] flex w-[40vw] flex-col items-center justify-center gap-2 p-4">
	<PostGallery className="min-h-[40vh]" {...props} />
	<Drawer.Header class="flex w-full flex-col gap-4 overflow-auto">
		<PostAuthor author={props.author} />
		<Drawer.Title>
			<h6>{props.title}</h6>
		</Drawer.Title>
		<Drawer.Description>
			<span class="text-sm">{props.description}</span>
		</Drawer.Description>
		<PostBadges {...props} />
	</Drawer.Header>
	<Drawer.Footer class="w-full">
		<PostBottomSheet editorMode={props.editorMode} price={props.price} />
	</Drawer.Footer>
</Drawer.Content>
