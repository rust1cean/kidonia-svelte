import type { AuthRepository } from './auth-repository';
import type { AuthService } from './auth-service';
import type { LogInPayload, SignUpPayload } from './auth-payload';

export class AuthServiceImpl implements AuthService {
	constructor(private repository: AuthRepository) {}

	public async getSession(): Promise<any> {
			return this.repository.getSession();
	}

	public async logIn(payload: LogInPayload): Promise<void> {
		return this.repository.logIn(payload);
	}

	public async logOut(): Promise<void> {
		return this.repository.logOut();
	}

	public async signUp(payload: SignUpPayload): Promise<void> {
		return this.repository.signUp(payload);
	}
}
