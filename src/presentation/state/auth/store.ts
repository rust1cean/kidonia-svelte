import type { SuperForm } from 'sveltekit-superforms';
import { signInRequest, signUpRequest } from '$lib/repository/auth';

export type FormInfo = {
	formData: FormData;
	form: SuperForm<any, any>;
};

const errorThrower = async (form: FormInfo['form']): Promise<any | Error> => {
	const { valid, errors } = await form.validateForm();

	if (!valid) {
		const [[firstErrorFromGroup]] = Object.values(errors) as any;
		throw firstErrorFromGroup;
	}
};

export const signIn = async ({ formData, form }: FormInfo): Promise<any | Error> => {
	await errorThrower(form).then(() =>
		signInRequest({
			email: formData.get('email') as string,
			password: formData.get('password') as string
		})
	);
};

export const signUp = async ({ formData, form }: FormInfo): Promise<any | Error> => {
	await errorThrower(form).then(() =>
		signUpRequest({
			name: formData.get('name') as string,
			email: formData.get('email') as string,
			password: formData.get('password') as string
		})
	);
};
