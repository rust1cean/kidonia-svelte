<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import SuperDebug, { defaults, superForm } from 'sveltekit-superforms';
	import { valibot } from 'sveltekit-superforms/adapters';

	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import type { PostProps } from './post';
	import { Textarea } from '$lib/components/ui/textarea';
	import TextField from '$lib/components/text-field.svelte';
	import ToggleField from '$lib/components/toggle-field.svelte';
	import SelectField from '$lib/components/select-field.svelte';
	import UploadField from '$lib/components/upload-field.svelte';
	import { createPost, modifyPostFormSchema } from '$lib/api/post';
	import { MAX_AGE, MIN_AGE, PostCategories } from '$lib/api/post';
	import { Slider } from '$lib/components/ui/slider';
	import { Label } from '$lib/components/ui/label';
	import { toast } from 'svelte-sonner';

	const {
		open,
		onClose,
		updatePost
	}: { open: boolean; onClose: (o: boolean) => any; updatePost?: PostProps } = $props();

	const postForm = superForm(defaults(valibot(modifyPostFormSchema)), {
		SPA: true,
		resetForm: false,
		validators: valibot(modifyPostFormSchema),
		async onSubmit({ formData }) {
			const { valid, errors } = await postForm.validateForm();

			if (valid) {
				const data = Object.fromEntries(formData.entries());

				const handleUpdate = async () => {
					// data
					// 	.then((_) => toast.message(m.login_successful()))
					// 	.catch((error) => toast.error(error.message));
				};
				const handleCreate = async () => {};

				updatePost ? handleUpdate() : handleCreate();
			} else {
				const [[firstErrorFromGroup]] = Object.values(errors) as any;
				toast.error(firstErrorFromGroup);
			}
		}
	});

	const { form } = postForm;

	const slider = $derived({
		minAge: [$form.minAge],
		maxAge: [$form.maxAge ?? MAX_AGE]
	});
</script>

<Dialog.Root controlledOpen {open} onOpenChange={onClose}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>{updatePost ? m.modify_post() : m.create_post()}</Dialog.Title>
		</Dialog.Header>

		<div class="max-h-[76vh] overflow-y-auto px-1">
			<SuperDebug data={$form} />
			<form
				class="flex flex-col gap-2"
				method="POST"
				enctype="multipart/form-data"
				use:postForm.enhance
			>
				<UploadField
					form={postForm}
					accept="image/png, image/jpeg"
					field="gallery"
					class="relative contain-paint"
				>
					{#snippet contentAfterLoad({ filenames, files })}
						{@render filenames()}
						<img
							src={URL.createObjectURL(files[0])}
							alt={files[0].name}
							class="absolute -z-50 size-[95%] rounded-xl object-cover brightness-50"
						/>
					{/snippet}
				</UploadField>
				<TextField form={postForm} field="title" type="text" label={m.title()} />
				<TextField Kind={Textarea} form={postForm} field="description" label={m.description()} />
				<TextField form={postForm} field="address" type="text" label={m.address()} />
				<TextField
					form={postForm}
					field="postcode"
					type="number"
					label={m.postcode()}
					min={10_000}
					max={99_999}
				/>
				<TextField form={postForm} field="phone" type="tel" label={m.phone()} />
				<TextField
					form={postForm}
					field="price"
					type="number"
					min={0}
					max={1_000}
					label="{m.price()} (€)"
				/>
				<SelectField label={m.category()} form={postForm} field="category">
					{#snippet items(Item)}
						{#each PostCategories as category (category)}
							<Item value={category} label={(m as any)[category]()} />
						{/each}
					{/snippet}
				</SelectField>
				<div class="flex flex-col gap-4">
					<div class="flex justify-between px-1">
						<Label class="min-w-fit">{m.min_age()}</Label>
						<Label class="min-w-fit">{m.max_age()}</Label>
					</div>
					<div class="flex items-center gap-6">
						<TextField
							form={postForm}
							field="minAge"
							type="number"
							min={MIN_AGE}
							max={$form.maxAge! - 1}
							class="w-fit"
						/>
						<Slider
							value={slider.minAge}
							onValueChange={([newAge]) => ($form.minAge = newAge)}
							min={MIN_AGE}
							max={$form.maxAge! - 1}
							step={1}
							class="min-w-[10vmin]"
						/>
						<Slider
							value={slider.maxAge}
							onValueChange={([newAge]) => ($form.maxAge = newAge)}
							min={$form.minAge + 1}
							max={MAX_AGE}
							step={1}
							class="min-w-[10vmin]"
						/>
						<TextField
							form={postForm}
							field="maxAge"
							type="number"
							min={$form.minAge - 1}
							max={MAX_AGE}
							class="w-fit"
						/>
					</div>
				</div>
			</form>
		</div>

		<Dialog.Footer>
			<ToggleField dir="ltr" form={postForm} field="draft" label={m.to_drafts()} />
			<Form.Button>
				{updatePost ? m.modify_post() : m.create_post()}
			</Form.Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
