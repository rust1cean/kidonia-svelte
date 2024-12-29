<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import ModifyPostDialog from '$lib/widgets/modify-post-dialog.svelte';
	import PostList from '$lib/widgets/post-list.svelte';
	import User from '$lib/components/user.svelte';
	import Sections from '$lib/components/sections.svelte';

	let openPostDialog = $state(false);
</script>

<ModifyPostDialog open={openPostDialog} onClose={(o) => (openPostDialog = o)} />

<div class="flex flex-col gap-8">
	<User />
	<Sections tabs={['favorites', 'posts', 'drafts']} defaultTab="favorites">
		<Tabs.Content value="favorites">
			<PostList categoryName="Favorites" />
		</Tabs.Content>
		<Tabs.Content value="posts">
			<!-- TODO: Set editor mode only for author! -->
			<PostList
				editorMode={true}
				categoryName="Posts"
				openModifyPostDialog={() => (openPostDialog = true)}
			/>
		</Tabs.Content>
		<Tabs.Content value="drafts">
			<PostList categoryName="Drafts" />
		</Tabs.Content>
	</Sections>
</div>
