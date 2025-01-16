<script lang="ts">
	import { Trash, Pencil, Heart } from 'lucide-svelte';

	import * as m from '$lib/app/paraglide/messages';
	import { Button } from '$lib/components/ui/button';
	import type { PostProps } from '.';

	let {
		price,
		className,
		editorMode
	}: { className?: string } & Pick<PostProps, 'editorMode' | 'price'> = $props();
</script>

<div class="{className} flex w-full items-center justify-between">
	<span class="text-sm font-semibold">
		{price && parseInt(price as string) > 0 ? `€${price}` : m.free()}
	</span>
	<div class="flex gap-2">
		{#if editorMode}
			<Button variant="secondary" size="icon" class="size-8 bg-red-400 p-2 hover:bg-red-400/95">
				<Trash size="16" class="text-white" />
			</Button>
			<Button variant="secondary" size="icon" class="size-8 bg-blue-400 p-2 hover:bg-blue-400/95">
				<Pencil size="16" class="text-white" />
			</Button>
		{/if}
		<Button variant="secondary" size="icon" class="size-8 bg-orange-400 p-2 hover:bg-orange-400/95">
			<Heart size="16" class="text-white" />
		</Button>
	</div>
</div>
