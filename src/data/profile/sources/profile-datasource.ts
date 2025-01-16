import type { CreateProfilePayload, UpdateProfilePayload } from '@/application/profile';
import type { ProfileId } from '@/domain/common';
import type { ProfileEntity } from '@/domain/profile';

export interface ProfileDatasource {
	get(id: ProfileId): Promise<ProfileEntity | null>;
	add(profile: CreateProfilePayload): Promise<ProfileEntity>;
	addMany(...newProfiles: CreateProfilePayload[]): Promise<ProfileEntity[]>;
	update(id: ProfileId, profile: UpdateProfilePayload): Promise<ProfileEntity | null>;
	delete(id: ProfileId): Promise<void>;
}
