<script module lang="ts">
	import {
		partial,
		pipe,
		object,
		string,
		minLength,
		maxLength,
		email,
		trim,
		file,
		maxSize,
		mimeType
	} from 'valibot';

	export type SignupFormSchema = typeof signupFormSchema;

	export const signupFormSchema = partial(
		object({
			name: pipe(
				string('Please enter your name'),
				minLength(4, 'Name must be at least 4 characters'),
				maxLength(35, 'Name must be less than 35 characters'),
				trim()
			),
			email: pipe(
				string('Please enter your email'),
				minLength(4, 'Email must be at least 4 characters'),
				maxLength(50, 'Email must be less than 50 characters'),
				email()
			),
			password: pipe(
				string('Please enter your password'),
				minLength(5, 'Password must be at least 5 characters'),
				maxLength(50, 'Password must be less than 50 characters'),
				trim()
			),
			confirm_password: pipe(
				string('Please confirm your password'),
				minLength(5, 'Confirm password must be at least 5 characters'),
				maxLength(50, 'Confirm password must be less than 50 characters'),
				trim()
			),
			avatar: pipe(
				file(),
				mimeType(['image/jpeg', 'image/png'], 'Please select a JPEG or PNG file'),
				maxSize(1024 * 1024 * 2, 'Please select an avatar smaller than 2 MB')
			)
		}),
		['avatar']
	);
</script>

<script lang="ts">
	import { defaults, superForm } from 'sveltekit-superforms';
	import { valibot } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';

	import { authStore } from '@/presentation/state/auth';
	import UploadAvatar from '$lib/components/upload-avatar.svelte';
	import TextField from '$lib/components/text-field.svelte';
	import * as m from '$lib/app/paraglide/messages';
	import AuthDialogFooter from '../auth-dialog-footer.svelte';
	import { authDialogState } from '../state';

	const signupForm = superForm(defaults(valibot(signupFormSchema)), {
		SPA: true,
		resetForm: true,
		validators: valibot(signupFormSchema),
		async onSubmit({ formData }) {
			try {
				authDialogState.changeToAwaiting()
				await authStore.signUp({ formData, form: signupForm });
				toast.message(m.signup_successful());
			} catch (error: any) {
				toast.error(error.toString());
			} finally {
				authDialogState.changeToIdle();
			}
		}
	});
</script>

<form
	method="POST"
	enctype="multipart/form-data"
	class="flex flex-col gap-2"
	use:signupForm.enhance
>
	<UploadAvatar class="size-full" form={signupForm} />
	<TextField form={signupForm} field="name" type="text" label={m.name()} />
	<TextField form={signupForm} field="email" type="email" label={m.email()} />
	<TextField form={signupForm} field="password" type="password" label={m.password()} />
	<TextField
		form={signupForm}
		field="confirm_password"
		type="password"
		label={m.confirm_password()}
	/>

	<AuthDialogFooter />
</form>
