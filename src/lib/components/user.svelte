<script lang="ts">
	import { User } from 'lucide-svelte';

	import * as Avatar from '$lib/components/ui/avatar';

	let { name = 'User', avatar = '' }: { name?: string; avatar?: string } = $props();
</script>

<div class="flex w-full items-center gap-6 rounded-full bg-secondary p-4">
	<Avatar.Root class="size-[20vmin]">
		<Avatar.Image src={avatar} alt={name} />
		<Avatar.Fallback>
			<User size="64" />
		</Avatar.Fallback>
	</Avatar.Root>
	<span class="text-3xl">
		{name}
	</span>
</div>
