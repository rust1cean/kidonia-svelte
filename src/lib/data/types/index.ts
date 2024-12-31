import type { Id, Identify } from '$lib/utils/types';
import type { PostCategory } from '../post';
import type { Tables } from './database.types';

export * from './database.types';

export type TableNames = unknown extends Tables<infer U> ? U : never;

export type FetchRange = {
	offset: number;
	limit: number;
};

export type PostsFilters = Identify<
	FetchRange & {
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
