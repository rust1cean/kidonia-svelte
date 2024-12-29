<script lang="ts">
	import { User } from 'lucide-svelte';

	import type { PostProps } from '.';
	import * as Avatar from '$lib/components/ui/avatar';

	let { author }: Pick<PostProps, 'author'> = $props();
</script>

<a class="flex w-full items-center justify-start gap-2" href="/profile/{author.id}">
	<Avatar.Root class="size-[2vmax]">
		<Avatar.Image src={author.avatar} alt={author.name} />
		<Avatar.Fallback>
			<User />
		</Avatar.Fallback>
	</Avatar.Root>
	<span>{author.name}</span>
</a>
