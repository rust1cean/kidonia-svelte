<script lang="ts">
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import { cn } from '$lib/shared/style-utils';

	let { ref = $bindable(null), class: className, ...restProps }: TabsPrimitive.ListProps = $props();
</script>

<TabsPrimitive.List
	bind:ref
	class={cn(
		'inline-flex items-center justify-center rounded-full  p-1 text-muted-foreground',
		className
	)}
	{...restProps}
/>
