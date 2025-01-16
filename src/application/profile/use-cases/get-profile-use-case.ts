import type { UserId } from '@/domain/common';
import type { ProfileService } from '../profile-service';
import type { ProfileEntity } from '@/domain/profile';

export class GetProfileUseCase {
	constructor(private service: ProfileService) {}

	public async execute(id: UserId): Promise<ProfileEntity | null> {
		return this.service.getProfile(id);
	}
}
