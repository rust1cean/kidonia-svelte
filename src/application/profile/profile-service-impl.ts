import type { ProfileEntity } from '@/domain/profile';
import type { CreateProfilePayload, UpdateProfilePayload } from './profile-payload';
import type { ProfileId } from '@/domain/common';
import type { ProfileService } from './profile-service';
import type { ProfileRepository } from './profile-repository';

export class ProfileServiceImpl implements ProfileService {
	constructor(private repo: ProfileRepository) {}

	public async getProfile(id: ProfileId): Promise<ProfileEntity | null> {
		return this.repo.getProfile(id);
	}

	public async createProfile(payload: CreateProfilePayload): Promise<ProfileEntity> {
		return this.repo.createProfile(payload);
	}

	public async editProfile(
		id: ProfileId,
		payload: UpdateProfilePayload
	): Promise<ProfileEntity> {
		return this.repo.updateProfile(id, payload);
	}

	public async deleteProfile(id: ProfileId): Promise<void> {
		return this.repo.deleteProfile(id);
	}
}
