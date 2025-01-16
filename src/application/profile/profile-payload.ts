import type { Role } from '@/data/profile';
import type { UserId } from '@/domain/common';

export type CreateProfilePayload = {
	id: UserId;
	name: string;
	role: Role;
	avatarUrl?: string;
};

export type UpdateProfilePayload = Partial<CreateProfilePayload>;
