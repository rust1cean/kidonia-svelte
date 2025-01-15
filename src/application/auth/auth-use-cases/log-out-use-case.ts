import type { AuthService } from '../auth-service';

export class LogOutUseCase {
	constructor(private service: AuthService) {}

	public async execute(): Promise<void> {
		return this.service.logOut();
	}
}
