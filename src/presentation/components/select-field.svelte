<script lang="ts">
	import type { Component, Snippet } from 'svelte';
	import { fieldProxy, type SuperForm } from 'sveltekit-superforms/client';
	import type { SelectItemProps } from 'bits-ui';

	import * as m from '$lib/app/paraglide/messages';
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';

	const {
		field,
		label,
		form,
		description,
		items
	}: {
		label: string;
		field: string;
		items: Snippet<[Component<Omit<SelectItemProps, 'child'>, {}, 'ref'>]>;
		form: SuperForm<any>;
		description?: string;
	} = $props();

	const value = fieldProxy(form, field);
</script>

<Form.Field {form} name={field}>
	<Form.Control>
		{#snippet children({ props })}
			<Form.Label>{label}</Form.Label>
			<Select.Root type="single" bind:value={$value} name={props.name}>
				<Select.Trigger {...props}>
					<!-- {console.log($value)}
					{label} -->
					{(m as any)[$value]?.() || label}
				</Select.Trigger>
				<Select.Content>
					{@render items(Select.Item)}
				</Select.Content>
			</Select.Root>
		{/snippet}
	</Form.Control>
	{#if description}
		<Form.Description>{description}</Form.Description>
	{/if}
	<Form.FieldErrors />
</Form.Field>
