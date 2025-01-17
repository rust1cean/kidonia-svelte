<script lang="ts">
	import * as m from '$lib/app/paraglide/messages';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import GoogleIcon from '$lib/components/icons/GoogleIcon.svelte';
	import AppleIcon from '$lib/components/icons/AppleIcon.svelte';
	import { tabState } from './state/tab-state.svelte';
	import { authDialogState } from './state';
	import { Spinner } from '@/presentation/components/ui/spinner';

	const switchTab = () => {
		switch (tabState.currentTab) {
			case 'signup':
				tabState.replaceCurrentTab('login');
				break;

			case 'login':
				tabState.replaceCurrentTab('signup');
				break;
		}
	};

	const switchToStyle = $derived.by(() => {
		if (tabState.currentTab === 'signup') return 'bg-green-600 hover:bg-green-600/90';
		return '';
	});

	const submitText = $derived.by(() => {
		if (tabState.currentTab === 'signup') return m.create_account();
		return m.login();
	});
</script>

<Dialog.Footer>
	<div class="flex w-full gap-2">
		<Button size="sm" variant="ghost" onclick={switchTab}>
			{#if tabState.currentTab === 'signup'}
				<span class="text-primary">{m.login()}</span>
			{:else}
				<span class="text-green-600">{m.signup()}</span>
			{/if}
		</Button>

		<Button size="icon" variant="outline">
			<GoogleIcon />
		</Button>
		<Button size="icon" variant="outline">
			<AppleIcon />
		</Button>
	</div>

	<Button class={switchToStyle} type="submit">
		{#if authDialogState.isAwaiting}
			<Spinner size="sm" />
		{:else}
			{submitText}
		{/if}
	</Button>
</Dialog.Footer>
