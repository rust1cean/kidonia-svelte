<script lang="ts">
	import type { Component, Snippet } from 'svelte';

	import Div from './elements/Div.svelte';

	const {
		Wrapper = Div,
		children,
		...restProps
	}: {
		children: Snippet;
		Component?: Component;
	} & any = $props();
</script>

<Wrapper {...restProps}>
	{@render children()}
</Wrapper>
