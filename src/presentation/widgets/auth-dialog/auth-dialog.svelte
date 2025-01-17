<script lang="ts">
	import { Undo2 } from 'lucide-svelte';
	import { slide } from 'svelte/transition';

	import * as Tabs from '$lib/components/ui/tabs';
	import * as Dialog from '$lib/components/ui/dialog';
	import { tabState } from './state/tab-state.svelte';
	import { SignupForm, LoginForm, EmailConfirmForm } from './forms';
	import { Button } from '@/presentation/components/ui/button';

	let { open = $bindable(false) }: { open: boolean } = $props();
</script>

<Dialog.Root bind:open>
	<Tabs.Root value={tabState.currentTab}>
		<Dialog.Content>
			<Dialog.Title class="flex items-center">
				{#if tabState.isMoreThanOneTab}
					<div class='mr-4' transition:slide={{ axis: 'x', duration: 300 }}>
						<Button variant="outline" onclick={() => tabState.closeTab('confirmEmail')}>
							<Undo2 />
						</Button>
					</div>
				{/if}
				<h4>{tabState.title}</h4>
			</Dialog.Title>

			<Dialog.Description>
				<span>
					{tabState.description}
				</span>
			</Dialog.Description>

			<Tabs.Content value="login">
				<LoginForm />
			</Tabs.Content>

			<Tabs.Content value="signup">
				<SignupForm />
			</Tabs.Content>

			<Tabs.Content value="confirmEmail">
				<EmailConfirmForm />
			</Tabs.Content>
		</Dialog.Content>
	</Tabs.Root>
</Dialog.Root>
