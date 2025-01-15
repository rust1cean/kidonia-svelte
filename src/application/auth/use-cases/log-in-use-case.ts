import type { AuthService } from '../auth-service';
import type { LogInPayload } from '../payload';

export class LogInUseCase {
	constructor(private service: AuthService) {}

	public async execute(payload: LogInPayload): Promise<void> {
		return this.service.logIn(payload);
	}
}
