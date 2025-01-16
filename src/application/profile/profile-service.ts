import type { ProfileEntity } from '@/domain/profile';
import type { CreateProfilePayload, UpdateProfilePayload } from './profile-payload';
import type { ProfileId } from '@/domain/common';

export interface ProfileService {
	getProfile(id: ProfileId): Promise<ProfileEntity | null>;
	createProfile(payload: CreateProfilePayload): Promise<ProfileEntity>;
	editProfile(id: ProfileId, payload: UpdateProfilePayload): Promise<ProfileEntity>;
  deleteProfile(id: ProfileId): Promise<void>;
}
