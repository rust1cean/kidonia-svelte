import type { AuthService } from '../auth-service';

export class GetSessionUseCase {
	constructor(private service: AuthService) {}

	public async execute(): Promise<any> {
		return this.service.getSession();
	}
}
