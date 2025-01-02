import { type PostCategory } from '$lib/data/post/post-constants';
import type { Id } from '$lib/utils/types';

export type PostId = PostVModel['id'];

export type PostVModel = {
	id: Id;
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
	postcode?: number | null;
	price?: number | null;
	updatedAt?: string;
};
