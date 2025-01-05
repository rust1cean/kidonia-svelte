<script lang="ts">
	import { type PostProps } from './index';
	import * as Drawer from '$lib/components/ui/drawer';

	import PostAuthor from './post-author.svelte';
	import PostBadges from './post-badges.svelte';
	import PostBottomSheet from './post-bottom-sheet.svelte';
	import PostGallery from './gallery.svelte';

	const {
		gallery,
		title,
		description,
		address,
		phone,
		education,
		age,
		author,
		price,
		editorMode
	}: PostProps = $props();
</script>

<Drawer.Content class="left-[30vw] flex w-[40vw] flex-col items-center justify-center gap-2 p-4">
	<PostGallery className="min-h-[40vh]" {gallery} {title} />
	<Drawer.Header class="flex w-full flex-col gap-4 overflow-auto">
		<PostAuthor {author} />
		<Drawer.Title>
			<h6>{title}</h6>
		</Drawer.Title>
		<Drawer.Description>
			<span class="text-sm">{description}</span>
		</Drawer.Description>
		<PostBadges {age} {phone} {address} {education} />
	</Drawer.Header>
	<Drawer.Footer class="w-full">
		<PostBottomSheet {editorMode} {price} />
	</Drawer.Footer>
</Drawer.Content>
