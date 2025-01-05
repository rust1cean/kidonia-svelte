<script lang="ts">
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { i18n } from '$lib/app/i18n';
	import { Toaster } from 'svelte-sonner';
	import { ModeWatcher } from 'mode-watcher';

	import '$lib/app/app.css';
	import Header from '$lib/widgets/header.svelte';

	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	<ModeWatcher />
	<Toaster />
	<Header />
	<main class="flex flex-col gap-32 px-layout py-16">
		{@render children?.()}
	</main>
</ParaglideJS>
