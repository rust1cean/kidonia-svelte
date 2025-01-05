<script lang="ts">
	import * as m from '$lib/app/paraglide/messages';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { Search } from 'lucide-svelte';

	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';

	let query: string = $state($page.url.searchParams.get('q') || '');
</script>

<form
	class="relative flex w-full items-center justify-center rounded-full"
	onsubmit={(e) => {
		e.preventDefault();
		const queryNotEqualPrevious = query != $page.url.searchParams.get('q');
		if (query.length > 2 && queryNotEqualPrevious) {
			const address = `/search?q=${query}`;
			goto(address, { invalidateAll: true });
		}
	}}
>
	<Input class="px-12 text-center text-lg" placeholder={m.search()} bind:value={query} />
	<Button type="submit" class="absolute right-0 rounded-full" size="icon" variant="outline">
		<Search />
	</Button>
</form>
