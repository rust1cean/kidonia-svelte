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
		onRequestItems = () => new Promise((res) => res(null)),
		from = $bindable(0),
		visibleCount = 16,
		shift = visibleCount / 2
	}: {
		items: Array<Item>;
		onRequestItems?: () => Promise<any>;
		component: Snippet<[(typeof items)[number]]>;
		from?: number;
		children?: Snippet;
		onLoad?: () => void;
		wrapperClassName?: string;
		scrollAreaClassName?: string;
		itemsClassName?: string;
		visibleCount?: number;
		shift?: number;
	} = $props();

	let pending = $state(false);
	const to = $derived(from + visibleCount);
	const partial = $derived(items.slice(from, to));

	let topObserver: HTMLElement | undefined = $state();
	let botObserver: HTMLElement | undefined = $state();

	// Returns true if shift was successfully applied
	// Otherwise returns false
	const back = (): boolean | number => from > 0 && (from -= shift);

	// Returns true if the shift was successfully applied
	// Otherwise returns false
	const next = (): boolean | number => to + shift <= items.length - 1 && (from += shift);

	const request = () => {
		return new Promise((res) => {
			if (!pending) {
				pending = true;
				onRequestItems()
					.then(() => res((pending = false)))
					.catch(console.error);
			}
		});
	};

	onMount(() => {
		if (items.length === 0) onRequestItems().then(onLoad).catch(console.error);

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

<!-- TODO: The observer must work only within the container. -->

<div class="relative flex flex-col overflow-hidden {wrapperClassName}">
	<div class="flex flex-col items-center overflow-auto {scrollAreaClassName}">
		<div bind:this={topObserver} class="min-h-2 w-full"></div>
		{#if pending}
			<Loader />
		{/if}
		<div class={itemsClassName}>
			{#each partial as item (item.id)}
				{@render component(item)}
			{/each}
		</div>
		<div bind:this={botObserver} class="min-h-2 w-full"></div>
	</div>

	{@render children?.()}
</div>
