import type { FetchRange, Id } from '../common/repository';
import type { PostCategory } from '$lib/domain/post/constants';
import type { Identify } from '$lib/utils/types';
import type { PostEntity } from './entity';

export interface PostRepository {
	fetchPosts(options: FetchPostsOptions): Promise<PostEntity[]>;
	fetchPostById(postId: Id): Promise<PostEntity | null>;
	createPost(postData: CreatePostData): Promise<void>;
	updatePost(postId: Id, postData: UpdatePostData): Promise<void>;
	deletePost(postId: Id): Promise<void>;
}

export type FetchPostsOptions = Identify<
	FetchRange & {
		query?: string | null;
		authorId?: Id | null;
		minAge?: number | null;
		maxAge?: number | null;
		address?: string | null;
		price?: number | null;
		draft?: boolean | null;
		zipcode?: number | null;
		categories?: Array<PostCategory>;
	}
>;

export type CreatePostData = {
	title: string;
	description: string;
	authorId: Id;
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

export type UpdatePostData = Partial<CreatePostData>;
