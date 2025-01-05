import type { Role } from ".";

export type CreateProfilePayload = {
	name: string;
	avatar_url?: string;
	role?: Role;
};

export type EditProfilePayload = Partial<CreateProfilePayload>;
