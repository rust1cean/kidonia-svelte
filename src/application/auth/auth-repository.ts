import type { LogInPayload, SignUpPayload } from './payload';

export interface AuthRepository {
	logIn(payload: LogInPayload): Promise<void>;
	logOut(): Promise<void>;
	signUp(payload: SignUpPayload): Promise<void>;
}
