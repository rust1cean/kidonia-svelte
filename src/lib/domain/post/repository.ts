import type { Id } from '$lib/common/post';
import type { PostCategory } from '$lib/domain/post/constants';
import type { PostEntity } from './entity';

export interface PostRepository {
	fetchPosts(filters: FilterPosts): Promise<PostEntity[]>;
	fetchPostById(id: Id): Promise<PostEntity | null>;
	createPost(post: CreatePost): Promise<void | null>;
	editPost(id: Id, post: EditPost): Promise<void | null>;
	deletePostById(id: Id): Promise<void | Error>;
}

export type FilterPosts = {
	query?: string | null;
	authorId?: Id | null;
	minAge?: number | null;
	maxAge?: number | null;
	address?: string | null;
	price?: number | null;
	draft?: boolean | null;
	postcode?: number | null;
	categories?: Array<PostCategory>;
};

export type CreatePost = {
	address?: string | null;
	author: string;
	category?: PostCategory | null;
	description?: string | null;
	draft?: boolean | null;
	image_path?: string | null;
	max_age?: number | null;
	min_age?: number | null;
	phone: string;
	postcode?: number | null;
	price?: number | null;
	title: string;
	updated_at?: string | null;
};

export type EditPost = {
	address?: string | null;
	category?: PostCategory | null;
	description?: string | null;
	draft?: boolean | null;
	image_path?: string | null;
	max_age?: number | null;
	min_age?: number | null;
	phone?: string;
	postcode?: number | null;
	price?: number | null;
	title?: string;
};
