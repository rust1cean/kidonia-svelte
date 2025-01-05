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
	zipcode: number;
	category?: PostCategory | null;
};

export type DetailedPostDto = Merge<PostEntity, { author: PostAuthor }>;

export type PostAuthor = {
	id: AuthorId;
	name: string;
	avatarUrl?: string;
};
