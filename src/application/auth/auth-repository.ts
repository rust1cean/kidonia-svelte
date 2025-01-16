import type { LogInPayload, SignUpPayload } from './auth-payload';

export interface AuthRepository {
	getSession(): Promise<any>;
	logIn(payload: LogInPayload): Promise<void>;
	logOut(): Promise<void>;
	signUp(payload: SignUpPayload): Promise<void>;
}
