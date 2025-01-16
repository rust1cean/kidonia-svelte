import type { Role } from '@/data/profile';
import type { ProfileId } from '@/domain/common';

export type CreateProfilePayload = {
	id: ProfileId;
	name: string;
	role: Role;
	avatarUrl?: string;
};

export type UpdateProfilePayload = Partial<CreateProfilePayload>;
