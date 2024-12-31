import type { Id, Identify } from '$lib/utils/types';
import type { BaseFetchOptions } from '../types';
import type { PostCategory } from './post-constants';

export type CreatePostPayload = {
	address?: string | null;
	author: string;
	category?: PostCategory | null;
	description?: string | null;
	draft?: boolean | null;
	image_path?: string | null;
	max_age?: number | null;
	min_age?: number | null;
	phone: string;
	postcode?: number | null;
	price?: number | null;
	title: string;
	updated_at?: string;
};

export type EditPostPayload = {
	address?: string | null;
	category?: PostCategory | null;
	description?: string | null;
	draft?: boolean | null;
	image_path?: string | null;
	max_age?: number | null;
	min_age?: number | null;
	phone?: string;
	postcode?: number | null;
	price?: number | null;
	title?: string;
};

export type FetchPostsPayload = Identify<
	BaseFetchOptions & {
		query?: string | null;
		authorId?: Id | null;
		minAge?: number | null;
		maxAge?: number | null;
		address?: string | null;
		price?: number | null;
		draft?: boolean | null;
		postcode?: number | null;
		categories?: Array<PostCategory>;
	}
>;
