import type { ProfileId } from '@/domain/common';
import type { ProfileService } from '../profile-service';

export class DeleteProfileUseCase {
	constructor(private service: ProfileService) {}

	public async execute(id: ProfileId): Promise<void> {
		return this.service.deleteProfile(id);
	}
}
