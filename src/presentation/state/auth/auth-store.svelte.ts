import { LogInUseCase, type LogOutUseCase, type SignUpUseCase } from '@/application/auth';
import type { GetSessionUseCase } from '@/application/auth/use-cases/get-session-use-case';
import { authContainer, TYPES } from '@/di/auth-container';
import type { Session } from '@supabase/supabase-js';
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

export const createAuthStore = () => {
	let session: Session | null = $state(null);

	const updateSession = async (): Promise<Session | null> => {
		const getSessionUseCase = authContainer.get<GetSessionUseCase>(TYPES.GetSessionUseCase);
		await getSessionUseCase.execute().then(({ session: newSession }) => (session = newSession));

		return session;
	};

	return {
		get isLogged(): boolean {
			return session != null;
		},

		get isNotLogged(): boolean {
			return session == null;
		},

		async getSession(): Promise<Session | null> {
			return updateSession();
		},

		async logIn({ formData, form }: FormInfo): Promise<Session | null> {
			await validateForm(form);

			const logInUseCase = authContainer.get<LogInUseCase>(TYPES.LogInUseCase);

			await logInUseCase.execute({
				email: formData.get('email') as string,
				password: formData.get('password') as string
			});

			return updateSession();
		},

		async logOut(): Promise<void> {
			const logOutUseCase = authContainer.get<LogOutUseCase>(TYPES.LogOutUseCase);
			await logOutUseCase.execute();

			updateSession();
		},

		async signUp({ formData, form }: FormInfo): Promise<Session | null> {
			await validateForm(form);

			const signUpUseCase = authContainer.get<SignUpUseCase>(TYPES.SignUpUseCase);

			await signUpUseCase.execute({
				name: formData.get('name') as string,
				email: formData.get('email') as string,
				password: formData.get('password') as string
			});

			return updateSession();
		}
	};
};

export const authStore = createAuthStore();
