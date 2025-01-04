<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	const { children, ...restProps }: { children: Snippet } & HTMLAttributes<any> = $props();
</script>

<div {...restProps}>
	{@render children()}
</div>
