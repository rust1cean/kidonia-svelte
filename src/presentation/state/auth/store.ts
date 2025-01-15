import { LogInUseCase, type LogOutUseCase, type SignUpUseCase } from '@/application/auth';
import { authContainer, TYPES } from '@/di/auth-container';
import type { SuperForm } from 'sveltekit-superforms';

export type FormInfo = {
	formData: FormData;
	form: SuperForm<any, any>;
};

const validateForm = async (form: FormInfo['form']): Promise<any | Error> => {
	const { valid, errors } = await form.validateForm();

	if (!valid) {
		const [[firstErrorFromGroup]] = Object.values(errors) as any;
		throw firstErrorFromGroup;
	}
};

export const logIn = async ({ formData, form }: FormInfo): Promise<void> => {
	await validateForm(form);

	const logInUseCase = authContainer.get<LogInUseCase>(TYPES.LogInUseCase);

	await logInUseCase
		.execute({
			email: formData.get('email') as string,
			password: formData.get('password') as string
		})
		.then(console.log);
};

export const logOut = async (): Promise<void> => {
	const logOutUseCase = authContainer.get<LogOutUseCase>(TYPES.LogOutUseCase);
	await logOutUseCase.execute();
};

export const signUp = async ({ formData, form }: FormInfo): Promise<void> => {
	await validateForm(form);

	const signUpUseCase = authContainer.get<SignUpUseCase>(TYPES.SignUpUseCase);

	await signUpUseCase.execute({
		name: formData.get('name') as string,
		email: formData.get('email') as string,
		password: formData.get('password') as string
	});
};
