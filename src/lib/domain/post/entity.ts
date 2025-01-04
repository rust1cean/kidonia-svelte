import type { AuthorId, PostId } from '../common/repository';
import type { PostCategory } from './constants';

export type PostEntity = {
	id: PostId;
	author: {
		id: AuthorId;
		name: string;
		avatarUrl?: string | null;
	};
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
