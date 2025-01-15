import type { AuthRepository } from './auth-repository';
import type { AuthService } from './auth-service';
import type { LogInPayload, SignUpPayload } from './payload';

export class AuthServiceImpl implements AuthService {
	constructor(private repository: AuthRepository) {}

	public async logIn(payload: LogInPayload): Promise<void> {
		this.repository.logIn(payload);
	}

	public async logOut(): Promise<void> {
		this.repository.logOut();
	}

	public async signUp(payload: SignUpPayload): Promise<void> {
		this.repository.signUp(payload);
	}
}
