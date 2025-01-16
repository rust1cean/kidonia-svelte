import type { ProfileService } from '../profile-service';
import type { ProfileEntity } from '@/domain/profile';
import type { UpdateProfilePayload } from '../profile-payload';
import type { UserId } from '@/domain/common';

export class EditProfileUseCase {
	constructor(private service: ProfileService) {}

	public async execute(id: UserId, payload: UpdateProfilePayload): Promise<ProfileEntity> {
		return this.service.editProfile(id, payload);
	}
}
