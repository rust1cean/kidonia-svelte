import type { Merge, SetOptional } from 'type-fest';
import type { Tables } from '../types';
import type { Identify } from '$lib/utils/types';
import type { Id } from '$lib/common';
import type { PostCategory } from '$lib/common/post';
import type { FetchRange } from '../types';

export type PostEntity = Merge<
	Tables<'post'>,
	{ author: SetOptional<Tables<'user'>, 'created_at'> }
>;

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
	updated_at?: string | null;
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

export type FilterPostsPayload = Identify<
	Partial<FetchRange> & {
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
