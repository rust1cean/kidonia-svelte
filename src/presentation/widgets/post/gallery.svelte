<script lang="ts">
	import { Image as ImageIcon } from 'lucide-svelte';
	import type { PostProps } from '.';

	const {
		gallery,
		title,
		onClick = () => {},
		className
	}: {
		gallery: PostProps['gallery'];
		title: PostProps['title'];
		onClick?: () => any;
		className?: string;
	} = $props();

	let imageExists = $state(gallery && gallery[0] != null);
</script>

<button
	class="{className} flex size-full h-[18vh] items-center justify-center rounded-3xl bg-muted brightness-90 duration-150 contain-paint hover:brightness-95"
	onclick={onClick}
>
	{#if imageExists}
		<img
			src={gallery[0]}
			onerror={() => (imageExists = false)}
			alt={title}
			class="size-full object-cover"
		/>
	{:else}
		<ImageIcon size="42" class="text-muted-foreground" />
	{/if}
</button>
