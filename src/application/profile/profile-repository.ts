import type { ProfileEntity } from '@/domain/profile';
import type { CreateProfilePayload, UpdateProfilePayload } from './profile-payload';
import type { ProfileId } from '@/domain/common';

export interface ProfileRepository {
	getProfile(id: ProfileId): Promise<ProfileEntity | null>;
	createProfile(payload: CreateProfilePayload): Promise<ProfileEntity>;
	updateProfile(id: ProfileId, payload: UpdateProfilePayload): Promise<ProfileEntity | null>;
	deleteProfile(id: ProfileId): Promise<void>;
}
