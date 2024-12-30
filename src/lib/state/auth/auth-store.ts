import { requestLogIn, requestSignUp } from '$lib/api/auth';
import type { SuperForm } from 'sveltekit-superforms';

export const logIn = async ({
	form,
	formData
}: {
	formData: FormData;
	form: SuperForm<any, any>;
}): Promise<any | Error> => {
	const { valid, errors } = await form.validateForm();

	if (valid) {
		await requestLogIn({
			email: formData.get('email') as string,
			password: formData.get('password') as string
		});
	} else {
		const [[firstErrorFromGroup]] = Object.values(errors) as any;
		throw firstErrorFromGroup;
	}
};
