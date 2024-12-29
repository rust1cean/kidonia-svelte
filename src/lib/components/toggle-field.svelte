<script lang="ts">
	import type { Component } from 'svelte';
	import { fieldProxy, type SuperForm } from 'sveltekit-superforms/client';

	import * as Form from '$lib/components/ui/form';
	import { Switch } from '$lib/components/ui/switch';

	const {
		field,
		label,
		form,
		dir = 'ltr'
	}: {
		field: string;
		label: string;
		dir?: 'ltr' | 'rtl';
		form: SuperForm<any>;
		Kind?: Component;
	} = $props();

	const value = fieldProxy(form, field);
</script>

<Form.Field
	{form}
	name={field}
	class="flex {dir == 'ltr' ? 'flex-row' : 'flex-row-reverse'} items-center gap-2 space-y-0 py-2"
>
	<Form.Control>
		{#snippet children({ props })}
			<Form.Label>{label}</Form.Label>
			<Switch {...props} bind:checked={$value} />
		{/snippet}
	</Form.Control>
	<Form.FieldErrors />
</Form.Field>
