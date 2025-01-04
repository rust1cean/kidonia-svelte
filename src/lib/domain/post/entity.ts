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
	category?: PostCategory | null;
	draft: boolean;
	minAge: number;
	maxAge: number;
	zipcode?: number | null;
	price: number;
	updatedAt: string;
};
