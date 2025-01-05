import type { PostId } from '@/domain/common/repository';
import type { PostCategory } from '@/domain/post';

export type PostVModel = {
	id: PostId;
	author: {
		id: string | number;
		name: string;
		avatar?: string | null;
	};
	title: string;
	gallery: string[];
	phone: string;
	description?: string | null;
	address?: string | null;
	category?: PostCategory | null;
	draft?: boolean | null;
	maxAge?: number | null;
	minAge?: number | null;
	zipcode?: number | null;
	price?: number | null;
	updatedAt?: string;
};
