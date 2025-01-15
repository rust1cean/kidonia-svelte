import type { AuthService } from '../auth-service';
import type { SignUpPayload } from '../payload';

export class SignUpUseCase {
	constructor(private service: AuthService) {}

	public async execute(payload: SignUpPayload): Promise<void> {
		this.service.signUp(payload);
	}
}
