<script lang="ts" generics="Item extends { id: number | string }">
	import { onMount, type Snippet } from 'svelte';
	import { Loader } from './ui/loader';

	let {
		children,
		component,
		onLoad,
		items,
		wrapperClassName,
		scrollAreaClassName,
		itemsClassName,
		onRequestItems = (_: { offset: number; limit: number }) => new Promise((res) => res(null)),
		offset = $bindable(0),
		visibleCount = 16,
		shift = visibleCount / 2
	}: {
		items: Array<Item>;
		onRequestItems?: (range: { offset: number; limit: number }) => Promise<any>;
		component: Snippet<[(typeof items)[number]]>;
		offset?: number;
		children?: Snippet;
		onLoad?: () => void;
		wrapperClassName?: string;
		scrollAreaClassName?: string;
		itemsClassName?: string;
		visibleCount?: number;
		shift?: number;
	} = $props();

	let pending = $state(false);
	const limit = $derived(offset + visibleCount);
	const partial = $derived(items.slice(offset, limit));

	let topObserver: HTMLElement | undefined = $state();
	let botObserver: HTMLElement | undefined = $state();

	// Returns true if shift was successfully applied
	// Otherwise returns false
	const back = (): boolean | number => offset > 0 && (offset -= shift);

	// Returns true if the shift was successfully applied
	// Otherwise returns false
	const next = (): boolean | number => limit + shift <= items.length - 1 && (offset += shift);

	const request = async () => {
		if (pending === false) {
			pending = true;
			return await onRequestItems({ offset, limit })
				.then(() => (pending = false))
				.catch(console.error);
		}
	};

	onMount(() => {
		if (items.length === 0) {
			request().then(onLoad).catch(console.error);
		}

		const onObserverIntersecting = (
			entries: IntersectionObserverEntry[],
			_observer: IntersectionObserver
		) => {
			entries.forEach(({ isIntersecting, target }) => {
				if (isIntersecting) {
					target.isSameNode(topObserver as HTMLElement) && back();
					target.isSameNode(botObserver as HTMLElement) && (next() || request().then(next));
				}
			});
		};

		const observerOptions = {
			root: null,
			rootMargin: '0px',
			threshold: 0.1
		};

		const observer = new IntersectionObserver(onObserverIntersecting, observerOptions);

		observer.observe(topObserver as HTMLElement);
		observer.observe(botObserver as HTMLElement);

		return () => observer.disconnect();
	});
</script>

<!-- TODO: When scrolling the page observers react, this should not be the case. -->

<div class="relative flex flex-col overflow-hidden {wrapperClassName}">
	<div class="flex flex-col items-center overflow-auto {scrollAreaClassName}">
		<div bind:this={topObserver} class="min-h-2 w-full"></div>
		{#if pending}
			<Loader />
		{/if}
		<div class="size-full {itemsClassName}">
			{#each partial as item (item.id)}
				{@render component(item)}
			{/each}
		</div>
		<div bind:this={botObserver} class="min-h-2 w-full"></div>
	</div>

	{@render children?.()}
</div>
