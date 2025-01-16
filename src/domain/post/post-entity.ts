import type { Merge } from 'type-fest';
import type { AuthorId, PostId } from '../common';
import type { PostCategory } from './post-constants';

export type PostEntity = {
	id: PostId;
	author: AuthorId;
	title: string;
	imagePath?: string | null;
	phone: string;
	description: string;
	address: string;
	draft: boolean;
	minAge: number | null;
	maxAge: number | null;
	price: number | null;
	updatedAt: string;
	zipcode: number;
	category?: PostCategory | null;
};

export type DetailedPostDto = Merge<PostEntity, { author: PostAuthor }>;

export type PostAuthor = {
	id: AuthorId;
	name: string;
	avatarUrl?: string;
};
