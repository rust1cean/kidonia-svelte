import type { LogInPayload, SignUpPayload } from '@/application/auth';

export interface AuthDatasource {
	logIn(payload: LogInPayload): Promise<void>;
	logOut(): Promise<void>;
	signUp(payload: SignUpPayload): Promise<void>;
}

export interface SessionDatasource {
	getSession(): Promise<any>;
}
