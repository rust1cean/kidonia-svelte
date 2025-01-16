import type { ProfileEntity } from '@/domain/profile';
import type { CreateProfilePayload, UpdateProfilePayload } from './profile-payload';
import type { UserId } from '@/domain/common';

export interface ProfileService {
	getProfile(id: UserId): Promise<ProfileEntity | null>;
	createProfile(payload: CreateProfilePayload): Promise<ProfileEntity>;
	editProfile(id: UserId, payload: UpdateProfilePayload): Promise<ProfileEntity>;
  deleteProfile(id: UserId): Promise<void>;
}
