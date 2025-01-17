<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Dialog from '$lib/components/ui/dialog';
	import { tabStore, type TabName } from './tab.svelte';
	import { SignupForm, LoginForm, EmailConfirmForm } from './forms/';

	let { open = $bindable(false) }: { open: boolean } = $props();

	const closeDialog = () => (open = false);
</script>

<Dialog.Root bind:open>
	<Tabs.Root bind:value={tabStore.currentTab}>
		<Dialog.Content>
			<Dialog.Title>
				<h4>{tabStore.title}</h4>
			</Dialog.Title>

			<Dialog.Description>
				<span>
					{tabStore.description}
				</span>
			</Dialog.Description>

			<Tabs.Content value="login">
				<LoginForm />
			</Tabs.Content>

			<Tabs.Content value="signup">
				<SignupForm />
			</Tabs.Content>

			<Tabs.Content value="emailConfirm">
				<EmailConfirmForm />
			</Tabs.Content>
		</Dialog.Content>
	</Tabs.Root>
</Dialog.Root>
