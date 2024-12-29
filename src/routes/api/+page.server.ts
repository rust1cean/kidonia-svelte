import type { Actions } from '@sveltejs/kit';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { modifyPostFormSchema } from '$lib/api/post';
import { loginFormSchema, signupFormSchema } from '$lib/api/auth';

export const actions = {
	login: async (event) => {
		const loginForm = await superValidate(event, zod(loginFormSchema));

		if (!loginForm.valid) {
			return fail(400, {
				loginForm
			});
		}

		return message(loginForm, 'Login form submitted');
	},

	signup: async (event) => {
		const signupForm = await superValidate(event, zod(signupFormSchema));

		if (!signupForm.valid) {
			return fail(400, {
				signupForm
			});
		}

		return message(signupForm, 'Register form submitted');
	},

	create_post: async (event) => {
		const postForm = await superValidate(event, zod(modifyPostFormSchema));

		if (!postForm.valid) {
			return fail(400, {
				postForm
			});
		}

		return message(postForm, 'Post created successfully');
	}
} satisfies Actions;
