import type { Id } from '../common/repository';
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
	zipcode?: number | null;
	price: number;
	updatedAt: string;
};
