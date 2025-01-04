<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { Component } from 'svelte';
	import { formFieldProxy, type SuperForm } from 'sveltekit-superforms/client';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';

	const {
		Kind = Input,
		field,
		label,
		form,
		description,
		...restProps
	}: {
		field: string;
		form: SuperForm<any>;
		label?: string;
		Kind?: Component;
		description?: string;
	} & Omit<HTMLInputAttributes, 'form'> = $props();

	const { value, constraints } = formFieldProxy(form, field);
</script>

<Form.Field {form} name={field}>
	<Form.Control>
		{#snippet children({ props })}
			{#if label}
				<Form.Label>{label}</Form.Label>
			{/if}
			<Kind {...props} {...restProps} {...constraints} placeholder={label} bind:value={$value} />
		{/snippet}
	</Form.Control>
	{#if description}
		<Form.Description>{description}</Form.Description>
	{/if}
	<Form.FieldErrors />
</Form.Field>
