import type { ProfileEntity } from '@/domain/profile';
import type { CreateProfilePayload, UpdateProfilePayload } from './profile-payload';
import type { UserId } from '@/domain/common';

export interface ProfileRepository {
	getProfile(id: UserId): Promise<ProfileEntity | null>;
	createProfile(payload: CreateProfilePayload): Promise<ProfileEntity>;
	updateProfile(id: UserId, payload: UpdateProfilePayload): Promise<ProfileEntity | null>;
	deleteProfile(id: UserId): Promise<void>;
}
