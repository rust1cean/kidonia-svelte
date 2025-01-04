import type { FetchRange, PostId } from '$lib/domain/common/repository';
import { type AuthorEntity, type PostCategory } from '$lib/domain/post';
import type { Identify } from '$lib/utils/types';

export type GetAuthorPostsPayload = Identify<FetchRange & { authorId: PostId }>;

export type SearchPostsPayload = Identify<
  FetchRange & {
    query: string;
    minAge?: number;
    maxAge?: number;
    categories?: PostCategory[];
    address?: string;
    zipcode?: number;
  }
>;

export type CreatePostPayload = {
	title: string;
	author: AuthorEntity;
	zipcode: number;
	address: string;
	phone: string;
	description?: string;
	imagePath?: string;
	maxAge?: number;
	minAge?: number;
	price?: number | null;
	category?: PostCategory | null;
};

export type EditPostPayload = {
	title?: string;
	zipcode?: number;
	address?: string;
	phone?: string;
	draft?: boolean;
	description?: string;
	imagePath?: string;
	maxAge?: number;
	minAge?: number;
	price?: number | null;
	category?: PostCategory | null;
};