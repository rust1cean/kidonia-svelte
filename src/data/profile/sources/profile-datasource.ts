import type { CreateProfilePayload, UpdateProfilePayload } from '@/application/profile';
import type { UserId } from '@/domain/common';
import type { ProfileEntity } from '@/domain/profile';

export interface ProfileDatasource {
	get(id: UserId): Promise<ProfileEntity | null>;
	add(profile: CreateProfilePayload): Promise<ProfileEntity>;
	addMany(...newProfiles: CreateProfilePayload[]): Promise<ProfileEntity[]>;
	update(id: UserId, profile: UpdateProfilePayload): Promise<ProfileEntity | null>;
	delete(id: UserId): Promise<void>;
}
