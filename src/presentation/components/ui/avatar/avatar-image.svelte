<script lang="ts">
	import { Avatar as AvatarPrimitive } from 'bits-ui';
	import { cn } from '$lib/shared/style-utils';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: AvatarPrimitive.ImageProps = $props();
</script>

<AvatarPrimitive.Image
	bind:ref
	class={cn('aspect-square h-full w-full object-cover', className)}
	{...restProps}
/>
