<script lang="ts" module>
	export type UploadFieldContentProps = {
		Label?: Component<LabelRootProps, {}, 'ref'>;
		clearButton?: Snippet;
	};
</script>

<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { filesProxy, type SuperForm } from 'sveltekit-superforms';
	import { CloudUpload, CircleX } from 'lucide-svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { Component, Snippet } from 'svelte';
	import type { LabelRootProps } from 'bits-ui';
	import type { Writable } from 'svelte/store';

	import { Wrapper as WrapperComponent } from './ui/wrapper';
	import { Label } from './ui/label';
	import { Button } from './ui/button';

	type FormArgs = {
		field: string;
		form: SuperForm<any>;
		files?: Writable<FileList | File[] | null | undefined>;
	};
	type RenderFunctions = {
		baseContent?: Snippet<
			[
				UploadFieldContentProps & {
					dropdownZone: Snippet<Parameters<typeof dropdownZone>>;
					filenames: Snippet<Parameters<typeof filenames>>;
					isLoaded: boolean;
					files: File[] | FileList | null | undefined;
				}
			]
		>;
		contentBeforeLoad?: Snippet<[UploadFieldContentProps]>;
		contentAfterLoad?: Snippet<
			[
				UploadFieldContentProps & {
					files: File[] | FileList;
					dropdownZone: Snippet<Parameters<typeof dropdownZone>>;
					filenames: Snippet<Parameters<typeof filenames>>;
				}
			]
		>;
	};
	type DynamicComponents = {
		Wrapper?: typeof WrapperComponent;
	};
	type Events = { onLoad?: (files: FileList | File[]) => any; onClear?: () => any };
	type Bounds = { maxSize?: number };

	const {
		// Form args
		field,
		form,
		files = $bindable(filesProxy(form, field)),

		// Render functions
		baseContent,
		contentBeforeLoad = dropdownZone as any,
		contentAfterLoad = filenames as any,

		// Events
		onLoad,
		onClear,

		// Bounds
		maxSize = 2_000_000,

		// Dynamic components
		Wrapper = Label as any,

		// Element props
		...restProps
	}: FormArgs &
		RenderFunctions &
		Events &
		Bounds &
		DynamicComponents &
		Omit<HTMLInputAttributes, 'form'> = $props();

	const checkSizeBounds = (newFiles: File[] | FileList): boolean =>
		Array.from(newFiles).every((file) => file.size < maxSize);

	const clearFiles = () => {
		files.set(null);
		onClear?.();
	};

	const onChange = (event: Event) => {
		event.preventDefault();
		if (isLoaded) {
			onLoad?.((event.target as HTMLInputElement).files!);
		} else {
			clearFiles();
		}
	};

	const isLoaded = $derived($files != null && $files.length === 1 && checkSizeBounds($files));
</script>

<input
	type="file"
	id={field}
	name={field}
	class="hidden"
	onchange={onChange}
	bind:files={$files as FileList}
/>
<WrapperComponent
	{Wrapper}
	class="relative my-2 flex h-[25vh] flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-8 duration-100 hover:border-border/80 {restProps?.class}"
	for={field}
	ondragover={(e: DragEvent) => e.preventDefault()}
	ondrop={(e: DragEvent) => (e.preventDefault(), files.set(e.dataTransfer?.files))}
>
	{@render baseContent?.({ Label, clearButton, filenames, dropdownZone, isLoaded, files: $files })}
	{#if isLoaded}
		{@render contentAfterLoad?.({ Label, clearButton, filenames, dropdownZone, files: $files! })}
		{@render clearButton()}
	{:else}
		{@render contentBeforeLoad?.({ Label, clearButton })}
	{/if}
</WrapperComponent>

{#snippet clearButton()}
	<Button size="sm" variant="outline" onclick={(e) => (e.preventDefault(), clearFiles())}>
		<CircleX />
		<span>{m.clear()}</span>
	</Button>
{/snippet}

{#snippet dropdownZone({
	Icon = CloudUpload as any,
	label = m.click_or_drop_files_here()
}: {
	Icon?: Component;
	label?: string;
})}
	<Icon />
	<span>{label}</span>
{/snippet}

{#snippet filenames(options: { maxVisible?: number } = { maxVisible: 5 })}
	{@const filenames = Array.from($files!)
		.slice(0, options.maxVisible)
		.map((f) => f.name)}

	{#each filenames as filename (filename)}
		<span class="w-full truncate text-center">{filename}</span>
	{/each}
{/snippet}
