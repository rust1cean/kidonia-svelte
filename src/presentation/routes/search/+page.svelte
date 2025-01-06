<script lang="ts">
	import { page } from '$app/stores';

	import PostFeed from '@/presentation/widgets/post-feed.svelte';
</script>

<PostFeed title={$page.url.searchParams.get('q') || ''} />
