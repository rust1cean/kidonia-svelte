<script lang="ts">
	import { Menu, User, Settings, Languages, LogOut } from 'lucide-svelte';
	import { i18n } from '$lib/app/i18n';
	import { page } from '$app/state';

	import { availableLanguageTags, languageTag } from '$lib/app/paraglide/runtime';
	import * as m from '$lib/app/paraglide/messages';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '../components/ui/dropdown-menu';
	import { Button } from '../components/ui/button';
	import { authStore } from '../state/auth';
	import { toast } from 'svelte-sonner';

	const {
		user = {
			name: 'User',
			avatar:
				'https://gratisography.com/wp-content/uploads/2024/03/gratisography-funflower-800x525.jpg'
		},
		onShowAuthDialog
	}: {
		onShowAuthDialog: () => any;
		user?: {
			name: string;
			avatar?: string;
		};
	} = $props();

	let menuOpen = $state(false);

	const logOut = async () => {
		await authStore.logOut();
		toast.message(m.logout_successful());
	};
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button size="icon" onclick={() => (menuOpen = !menuOpen)}>
			<Menu />
		</Button>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content class="w-64" align="end">
		<DropdownMenu.Group>
			{#if user}
				<a href="/profile">
					<DropdownMenu.Item>
						<Avatar.Root class="size-[2vmax]">
							<Avatar.Image src={user.avatar} alt={user.name} />
							<Avatar.Fallback>
								<User />
							</Avatar.Fallback>
						</Avatar.Root>
						<span class="text-lg">{user.name}</span>
					</DropdownMenu.Item>
				</a>
			{/if}

			{#if authStore.isNotLogged}
				<DropdownMenu.Separator />

				<DropdownMenu.Item onclick={onShowAuthDialog}>
					<User />
					<span>{m.login()}</span>
				</DropdownMenu.Item>
			{/if}

			<DropdownMenu.Separator />

			<DropdownMenu.Sub>
				<DropdownMenu.SubTrigger>
					<Languages size="16" />
					<span>{m.select_language()}</span>
				</DropdownMenu.SubTrigger>

				<DropdownMenu.SubContent>
					<DropdownMenu.RadioGroup value={languageTag()}>
						{#each availableLanguageTags as lang}
							<a
								href={i18n.route(page.url.pathname)}
								hreflang={lang}
								aria-current={lang === languageTag() ? 'page' : undefined}
							>
								<DropdownMenu.RadioItem value={lang}>
									{lang}
								</DropdownMenu.RadioItem>
							</a>
						{/each}
					</DropdownMenu.RadioGroup>
				</DropdownMenu.SubContent>
			</DropdownMenu.Sub>

			<a href="/settings">
				<DropdownMenu.Item>
					<Settings size="16" />
					<span>{m.settings()}</span>
				</DropdownMenu.Item>
			</a>

			{#if authStore.isLogged}
				<DropdownMenu.Separator />

				<DropdownMenu.Item onclick={logOut}>
					<LogOut size="16" />
					<span>{m.logout()}</span>
				</DropdownMenu.Item>
			{/if}
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
