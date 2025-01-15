import type { AuthRepository } from './auth-repository';
import type { AuthService } from './auth-service';
import type { LogInPayload, SignUpPayload } from './payload';

export class AuthServiceImpl implements AuthService {
	constructor(private repository: AuthRepository) {}

	public async logIn(payload: LogInPayload): Promise<any> {
		return this.repository.logIn(payload);
	}

	public async logOut(): Promise<void> {
		return this.repository.logOut();
	}

	public async signUp(payload: SignUpPayload): Promise<any> {
		return this.repository.signUp(payload);
	}
}
