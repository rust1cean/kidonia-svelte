import type { FetchRange, PostId } from '@/domain/common';
import type { PostAuthor, DetailedPostDto } from '@/domain/post';
import type { PostCategory } from '@/domain/post/post-constants';
import type { Tables } from '@/infrastructure/db';
import type { Identify } from '@/utils/types';

export interface PostRepository {
	fetchPosts(options: FetchPostsOptions): Promise<DetailedPostDto[]>;
	fetchPostById(postId: PostId): Promise<DetailedPostDto | null>;
	createPost(postData: CreatePostData): Promise<void>;
	updatePost(postId: PostId, postData: UpdatePostData): Promise<void>;
	deletePost(postId: PostId): Promise<void>;
}

export type FetchPostsOptions = Identify<
	FetchRange & {
		title?: string;
		description?: string;
		authorId?: PostId;
		address?: string;
		minAge?: number | null;
		maxAge?: number | null;
		price?: number | null;
		draft?: boolean;
		zipcode?: number;
		categories?: Array<PostCategory> | null;
		orderBy?: OrderBy | null;
	}
>;

export type OrderBy = {
	column: keyof Tables<'post'>;
	ascending: boolean;
};

export type CreatePostData = {
	title: string;
	description: string;
	author: PostAuthor;
	address: string;
	draft: boolean;
	imagePath: string;
	minAge: number;
	maxAge: number;
	phone: string;
	zipcode: number;
	price: number | null;
	category: PostCategory | null;
};

export type UpdatePostData = Partial<Omit<CreatePostData, 'author'>>;
