<script module lang="ts">
	import { pipe, object, string, minLength, maxLength, email, trim } from 'valibot';

	export type LoginFormSchema = typeof loginFormSchema;

	export const loginFormSchema = object({
		email: pipe(
			string('Required'),
			minLength(4, 'Email must be at least 4 characters'),
			maxLength(50, 'Email must be less than 50 characters'),
			email()
		),
		password: pipe(
			string('Required'),
			minLength(5, 'Password must be at least 5 characters'),
			maxLength(50, 'Password must be less than 50 characters'),
			trim()
		)
	});
</script>

<script lang="ts">
	import { superForm, defaults } from 'sveltekit-superforms';
	import { valibot } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';

	import * as m from '$lib/app/paraglide/messages';
	import { authStore } from '@/presentation/state/auth';
	import TextField from '@/presentation/components/text-field.svelte';
	import { AuthDialogFooter, tabState } from '..';
	import { authDialogState } from '../state';

	const loginForm = superForm(defaults(valibot(loginFormSchema)), {
		SPA: true,
		resetForm: true,
		validators: valibot(loginFormSchema),
		async onSubmit({ formData }) {
			try {
				authDialogState.changeToAwaiting()
				await authStore.logIn({ formData, form: loginForm });
				tabState.openTab('confirmEmail');
			} catch (error: any) {
				toast.error(error.toString());
			} finally {
				authDialogState.changeToIdle();
			}
		}
	});
</script>

<form method="POST" class="flex flex-col gap-2" use:loginForm.enhance>
	<TextField form={loginForm} field="email" type="email" label={m.email()} />
	<TextField form={loginForm} field="password" type="password" label={m.password()} />
	<AuthDialogFooter />
</form>
