<script lang="ts">
	import * as m from '$lib/app/paraglide/messages';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import GoogleIcon from '$lib/components/icons/GoogleIcon.svelte';
	import AppleIcon from '$lib/components/icons/AppleIcon.svelte';
	import { tabStore, type TabName } from './tab.svelte';

	const switchTab = () => {
		switch (tabStore.currentTab) {
			case 'signup':
				tabStore.replaceCurrentTab('login');
				break;

			case 'login':
				tabStore.replaceCurrentTab('signup');
				break;
		}
	};

	const switchToStyle = $derived.by(() => {
		if (tabStore.currentTab === 'signup') return 'bg-green-600 hover:bg-green-600/90';
		return '';
	});
</script>

<Dialog.Footer>
	<div class="flex w-full gap-2">
		<!-- <Tabs.List class="bg-transparent p-0"> -->
		<!-- <Tabs.Trigger value={switchTo} class="p-0"> -->
		<Button size="sm" variant="ghost" onclick={switchTab}>
			{#if tabStore.currentTab === 'signup'}
				<span class="text-primary">{m.login()}</span>
			{:else}
				<span class="text-green-600">{m.signup()}</span>
			{/if}
		</Button>
		<!-- </Tabs.Trigger> -->
		<!-- </Tabs.List> -->

		<Button size="icon" variant="outline">
			<GoogleIcon />
		</Button>
		<Button size="icon" variant="outline">
			<AppleIcon />
		</Button>
	</div>
	<Button class={switchToStyle} type="submit">
		{tabStore.currentTab === 'signup' ? m.signup() : m.login()}
	</Button>
</Dialog.Footer>
