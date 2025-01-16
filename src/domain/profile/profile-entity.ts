import type { UserId } from '../common';
import type { Role } from './profile-constants';

export type ProfileEntity = {
	id: UserId;
	name: string;
	role: Role;
	avatarUrl?: string | null;
	createdAt: string;
};
