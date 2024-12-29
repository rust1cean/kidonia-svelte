import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginFormSchema, signupFormSchema } from '$lib/api/auth/auth-form-schema';
import { modifyPostFormSchema } from '$lib/api/post/post-form-schema';

export const load = async () => {
	return {
		modifyPostForm: await superValidate(zod(modifyPostFormSchema)),
		signupForm: await superValidate(zod(signupFormSchema)),
		loginForm: await superValidate(zod(loginFormSchema))
	};
};
