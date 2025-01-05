import type { Merge } from 'type-fest';
import type { AuthorId, PostId } from '../common/repository';
import type { PostCategory } from './constants';

export type PostEntity = {
	id: PostId;
	author: AuthorId;
	title: string;
	imagePath: string;
	phone: string;
	description: string;
	address: string;
	draft: boolean;
	minAge: number;
	maxAge: number;
	price: number | null;
	updatedAt: string;
	category?: PostCategory | null;
	zipcode?: number | null;
};

export type DetailedPostEntity = Merge<PostEntity, { author: AuthorEntity }>;

export type AuthorEntity = {
	id: AuthorId;
	name: string;
	avatarUrl?: string;
};
