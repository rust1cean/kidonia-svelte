import { type PostCategory } from '$lib/repository/post/constants';
import type { Id } from '$lib/utils/types';

export type PostId = PostModel['id'];

export type PostModel = {
	id: Id;
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
	postcode?: number | null;
	price: number;
	updatedAt: Date;
};
