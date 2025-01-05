import type { FetchRange, PostId } from '@/domain/common/repository';
import { type PostAuthor, type PostCategory } from '@/domain/post';
import type { Identify } from '@/utils/types';

export type GetAuthorPostsPayload = Identify<FetchRange & { authorId: PostId }>;

export type GetPostsPayload = Identify<FetchRange & {
	query?: string;
	minAge?: number;
	maxAge?: number;
	categories?: PostCategory[];
	address?: string;
	zipcode?: number;
}>;

export type CreatePostPayload = {
	title: string;
	author: PostAuthor;
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
