<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { Pencil, Plus } from 'lucide-svelte';

	import PartialView from '$lib/components/partial-view.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Post } from '$lib/widgets/post';
	import type { PostModel } from '$lib/state/post';

	// createPost({
	// 	author: "7178b695-ef82-4688-915f-24f6f7535521",
	// 	title: "It's a test title",
	// 	description: '',
	// 	phone: ''
	// }).then(console.log);

	const genRandomPosts = async (count: number = 64): Promise<PostModel[]> =>
		Array.from(
			Array.from(Array(count).keys()).map((i) => ({
				id: i.toString(),
				gallery: [
					Math.random() > 0.5
						? 'https://gratisography.com/wp-content/uploads/2024/03/gratisography-funflower-800x525.jpg'
						: ''
				],
				title: 'Test title',
				description: 'Lorem ipsum dolor sit amet, consectetur adip',
				address: Math.random() > 0.5 ? 'Test address' : '',
				phone: Math.random() > 0.5 ? '+305812588585' : '',
				education: Math.random() > 0.5 ? 'High School' : '',
				age: Math.random() > 0.5 ? '12-16' : '',
				author: {
					id: i.toString(),
					name: 'Test organization',
					avatar:
						'https://gratisography.com/wp-content/uploads/2024/03/gratisography-funflower-800x525.jpg'
				},
				price: Math.random() > 0.5 ? 79.89 : 0,
				minAge: 0,
				maxAge: 18,
				draft: Math.random() > 0.3,
				updatedAt: new Date()
			}))
		);

	let {
		title,
		openModifyPostDialog,
		editorMode = false,
		posts = [],
		requestPosts = genRandomPosts as any
	}: {
		editorMode?: boolean;
		title?: string;
		posts?: Array<PostModel>;
		requestPosts?: () => Promise<typeof posts>;
		openModifyPostDialog?: (post?: PostModel) => any;
	} = $props();

	let loaded: boolean = $state(false);

	const onPostsRequest = () =>
		requestPosts()
			.then((newPosts) => posts.push(...newPosts))
			.catch(console.error);
</script>

<section class="flex h-[85vh] min-w-full flex-col gap-6 rounded-3xl">
	{#if loaded}
		<header class="flex w-full items-center justify-between">
			<div class="flex gap-4">
				<h3>{title}</h3>
				{#if editorMode}
					<Button variant="outline">
						<Pencil />
						{m.rename()}
					</Button>
				{/if}
			</div>

			{#if editorMode}
				<Button variant="default" onclick={() => openModifyPostDialog && openModifyPostDialog()}>
					<Plus />
					{m.add_post()}
				</Button>
			{/if}
		</header>
	{/if}

	<PartialView
		wrapperClassName="size-full rounded-2xl"
		scrollAreaClassName="pr-2"
		itemsClassName="grid xl:grid-cols-4 grid-cols-2 gap-4"
		items={posts}
		onRequestItems={onPostsRequest}
		onLoad={() => (loaded = true)}
	>
		<!-- Gradient -->
		<div
			class="pointer-events-none absolute left-0 top-0 size-full bg-gradient-to-b from-transparent from-95% to-background"
		></div>
		{#snippet component(postData)}
			<Post {...postData} {editorMode} />
		{/snippet}
	</PartialView>
</section>
