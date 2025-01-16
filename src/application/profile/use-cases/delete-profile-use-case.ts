import type { UserId } from '@/domain/common';
import type { ProfileService } from '../profile-service';

export class DeleteProfileUseCase {
	constructor(private service: ProfileService) {}

	public async execute(id: UserId): Promise<void> {
		return this.service.deleteProfile(id);
	}
}
