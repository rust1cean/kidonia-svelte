import type { ProfileId } from '../common';
import type { Role } from './profile-constants';

export type ProfileEntity = {
	id: ProfileId;
	name: string;
	role: Role;
	avatarUrl?: string | null;
	createdAt: string;
};
