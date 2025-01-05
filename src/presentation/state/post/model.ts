import type { PostId } from '@/domain/common/repository';
import type { PostCategory } from '@/domain/post';

export type PostVModel = {
	id: PostId;
	author: {
		id: string | number;
		name: string;
		avatarUrl?: string;
	};
	title: string;
	phone: string;
	description: string;
	address: string;
	category?: PostCategory | null;
	draft: boolean;
	maxAge: number;
	minAge: number;
	zipcode: number;
	price?: number | null;
	updatedAt: Date;
};
