<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { User } from 'lucide-svelte';
	import type { SuperForm } from 'sveltekit-superforms';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { AvatarImageLoadingStatus } from 'bits-ui';

	import * as Avatar from './ui/avatar';
	import { Button } from './ui/button';
	import UploadField from './upload-field.svelte';

	const {
		form,
		maxSize = 2_000_000,
		...restProps
	}: {
		form: SuperForm<any>;
		maxSize?: number;
	} & HTMLAttributes<any> = $props();

	let src: string = $state('');
	let loadingStatus: AvatarImageLoadingStatus = $state('loading');
</script>

<UploadField
	field="avatar"
	accept="image/png, image/jpeg"
	{...restProps}
	onLoad={([file]) => (src = URL.createObjectURL(file))}
	onClear={() => {
		loadingStatus = 'loading';
	}}
	{form}
	{maxSize}
>
	{#snippet baseContent()}
		<Avatar.Root
			class="size-[5vmax]"
			{loadingStatus}
			onLoadingStatusChange={(status) => (loadingStatus = status)}
		>
			<Avatar.Image {src} alt={m.upload_avatar()} />
			<Avatar.Fallback>
				<User size="48" />
			</Avatar.Fallback>
		</Avatar.Root>
	{/snippet}

	{#snippet contentBeforeLoad()}
		<Button size="sm" variant="outline" class="pointer-events-none">
			{m.upload_avatar()}
		</Button>
	{/snippet}
</UploadField>
