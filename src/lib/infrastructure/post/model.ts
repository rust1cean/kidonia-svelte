import type { PostId } from '$lib/domain/common/repository';
import type { PostCategory } from '$lib/domain/post';

export type PostModel = {
	id: PostId;
	author: {
		id: string | number;
		name: string;
		avatar?: string | null;
	};
	title: string;
	gallery: string[];
	phone: string;
	description: string;
	address: string;
	category?: PostCategory | null;
	draft: boolean;
	minAge: number;
	maxAge: number;
	zipcode?: number | null;
	price: number;
	updatedAt: Date;
};
