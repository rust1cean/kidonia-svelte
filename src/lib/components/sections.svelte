<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { page } from '$app/stores';
	import { pushState, replaceState } from '$app/navigation';
	import type { Snippet } from 'svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import { pushPath, replacePath } from '$lib/utils/url';

	const {
		tabs,
		children,
		defaultTab
	}: { tabs: Array<string>; children: Snippet; defaultTab: string } = $props();

	const getTabOnLoad = () =>
		tabs.find((tab) => $page.url.pathname.match(new RegExp(tab))) || defaultTab;

	let currentTab = $state(getTabOnLoad());

	const switchTab = (tab: (typeof tabs)[number]) => {
		const { href } = window.location;
		const canReplace = tabs.some((tab) => href.includes(tab));

		if (canReplace) {
			replaceState(replacePath(href, tab), {});
		} else {
			pushState(pushPath(href, tab), {});
		}
	};
</script>

<Tabs.Root value={currentTab} class="flex size-full flex-col items-center justify-center gap-8">
	<Tabs.List
		class="sticky top-[10vh] z-10 flex max-w-full justify-start gap-2 overflow-x-auto bg-background/80 backdrop-blur"
	>
		{#each tabs as tab (tab)}
			<Tabs.Trigger
				value={tab}
				onclick={(e) => {
					e.preventDefault();
					switchTab(tab);
				}}
			>
				{(m as any)[tab]()}
			</Tabs.Trigger>
		{/each}
	</Tabs.List>

	{@render children()}
</Tabs.Root>
