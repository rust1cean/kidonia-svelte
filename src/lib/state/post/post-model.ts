import type { PostCategory } from '$lib/api/post/post-constants';
import type { Id } from '$lib/utils/types';

export type PostModel = {
	id: Id;
	author: {
		id: string | number;
		avatar?: string | null;
		name: string;
	};
	title: string;
	gallery: string[];
	description?: string | null;
	address?: string | null;
	category?: PostCategory | null;
	draft?: boolean | null;
	maxAge?: number | null;
	minAge?: number | null;
	phone: string;
	postcode?: number | null;
	price?: number | null;
	updated_at?: string;
};
