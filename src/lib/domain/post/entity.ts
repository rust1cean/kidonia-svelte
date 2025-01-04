import type { Id } from '$lib/common/post';
import type { PostCategory } from './constants';

export type PostEntity = {
	id: Id;
	author: Id;
	title: string;
	gallery: string;
	phone: string;
	description: string;
	address: string;
	category?: PostCategory | null;
	draft: boolean;
	minAge: number;
	maxAge: number;
	postcode?: number | null;
	price: number;
	updatedAt: string;
};
