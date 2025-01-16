import type { ProfileService } from '../profile-service';
import type { ProfileEntity } from '@/domain/profile';
import type { CreateProfilePayload } from '../profile-payload';

export class CreateProfileUseCase {
	constructor(private service: ProfileService) {}

	public async execute(payload: CreateProfilePayload): Promise<ProfileEntity> {
		return this.service.createProfile(payload);
	}
}
