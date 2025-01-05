<script lang="ts">
	import { MapPin, Phone, GraduationCap, User } from 'lucide-svelte';

	import { Badge } from '$lib/components/ui/badge';
	import type { PostProps } from '.';
	import { MAX_AGE, MIN_AGE } from '@/domain/post';

	let { address, minAge, maxAge, phone, education }: PostProps = $props();
</script>

<div class="flex flex-wrap gap-2">
	{#if address != null && address.length > 0}
		<Badge class="w-fit" variant="outline">
			<MapPin size="16" class="text-red-400" />
			<span>{address}</span>
		</Badge>
	{/if}
	{#if minAge != null}
		<Badge class="w-fit" variant="outline">
			<User size="16" class="text-secondary-foreground" />
			<span>{minAge ?? MIN_AGE}-{maxAge ?? MAX_AGE}</span>
		</Badge>
	{/if}
	{#if phone}
		<Badge class="w-fit" variant="outline">
			<Phone size="16" class="text-green-400" />
			<span>{phone}</span>
		</Badge>
	{/if}
	{#if education}
		<Badge class="w-fit" variant="outline">
			<GraduationCap size="16" class="text-blue-400" />
			<span>{education}</span>
		</Badge>
	{/if}
</div>
