<script lang="ts">
	import { page } from '$app/stores';

	import PostList from '$lib/widgets/post-list.svelte';
</script>

<PostList title={$page.url.searchParams.get('q') || ''} />
