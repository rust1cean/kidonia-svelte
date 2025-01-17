<script lang="ts">
	import { tv } from 'tailwind-variants';

	const {
		size = 'md'
	}: {
		size: 'md' | 'sm';
	} = $props();

	const spinner = tv({
		base: 'inline-block animate-spin rounded-[50%] border-r-4 border-t-4 border-r-transparent border-t-foreground',
		variants: {
			size: {
				sm: 'size-4',
				md: 'size-8'
			}
		},
		defaultVariants: {
			size: 'md'
		}
	});
</script>

<div class={spinner({ size })}></div>
