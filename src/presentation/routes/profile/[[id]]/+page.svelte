<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import ModifyPostDialog from '$lib/widgets/modify-post-dialog.svelte';
	import PostFeed from '@/presentation/widgets/post-feed.svelte';
	import User from '$lib/components/user.svelte';
	import Sections from '$lib/components/sections.svelte';

	let openPostDialog = $state(false);
</script>

<ModifyPostDialog open={openPostDialog} onClose={(o) => (openPostDialog = o)} />

<div class="flex flex-col gap-8">
	<User />
	<Sections class="size-full" tabs={['favorites', 'posts', 'drafts']} defaultTab="favorites">
		<div class="size-full">
			<Tabs.Content value="favorites">
				<PostFeed title="Favorites" />
			</Tabs.Content>
			<Tabs.Content value="posts">
				<!-- TODO: Set editor mode only for author! -->
				<PostFeed
					editorMode={true}
					title="Posts"
					openModifyPostDialog={() => (openPostDialog = true)}
				/>
			</Tabs.Content>
			<Tabs.Content value="drafts">
				<PostFeed title="Drafts" />
			</Tabs.Content>
		</div>
	</Sections>
</div>
