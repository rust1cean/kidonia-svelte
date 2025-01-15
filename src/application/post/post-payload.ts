import type { PostId } from '@/domain/common';
import { type PostAuthor, type PostCategory } from '@/domain/post';

export type GetAuthorPostsPayload = { authorId: PostId; sortBy?: SortBy };

export type GetPostsPayload = {
	query?: string;
	sortBy?: SortBy | null;
	minAge?: number | null;
	maxAge?: number | null;
	categories?: PostCategory[] | null;
	address?: string;
	zipcode?: number;
};
export type SortBy = 'recently' | 'oldest' | 'popularity';

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
