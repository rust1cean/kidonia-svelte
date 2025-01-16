import type { AuthRepository, LogInPayload, SignUpPayload } from '@/application/auth';
import type { AuthDatasource, SessionDatasource } from './sources/interfaces';

export class AuthRepositoryImpl implements AuthRepository {
	constructor(
		private sessionSource: SessionDatasource,
		private authSource: AuthDatasource
	) {}

	public async getSession(): Promise<any> {
		return this.sessionSource.getSession();
	}

	public async logIn(payload: LogInPayload) {
		return this.authSource.logIn(payload);
	}

	public async logOut(): Promise<void> {
		return this.authSource.logOut();
	}

	public async signUp(payload: SignUpPayload) {
		return this.authSource.signUp(payload);
	}
}
