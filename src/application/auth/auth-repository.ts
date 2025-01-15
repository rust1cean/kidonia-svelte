import type { LogInPayload, SignUpPayload } from './auth-payload';

export interface AuthRepository {
	logIn(payload: LogInPayload): Promise<any>;
	logOut(): Promise<void>;
	signUp(payload: SignUpPayload): Promise<any>;
}
