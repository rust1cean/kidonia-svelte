import type { ProfileId } from '@/domain/common';
import type { ProfileService } from '../profile-service';
import type { ProfileEntity } from '@/domain/profile';

export class GetProfileUseCase {
	constructor(private service: ProfileService) {}

	public async execute(id: ProfileId): Promise<ProfileEntity | null> {
		return this.service.getProfile(id);
	}
}
