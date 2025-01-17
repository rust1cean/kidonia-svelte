<script lang="ts">
	import ModeSwitcher from '$lib/widgets/mode-switcher.svelte';
	import Favorites from '$lib/components/favorites.svelte';
	import Search from '$lib/widgets/search.svelte';
	import Menu from '$lib/widgets/menu-bar.svelte';
	import AuthDialog from '@/presentation/widgets/auth-dialog/auth-dialog.svelte';

	let authDialogOpen = $state(false);
</script>

<AuthDialog bind:open={authDialogOpen} />
<nav
	class="sticky top-0 z-20 grid h-[72px] w-full grid-cols-3 bg-background/80 px-layout backdrop-blur"
>
	<a href="/" class="flex items-center text-2xl">Kidonia</a>
	<Search />
	<div class="flex items-center justify-end gap-2">
		<ModeSwitcher />
		<Favorites />
		<Menu onShowAuthDialog={() => (authDialogOpen = true)} />
	</div>
</nav>
