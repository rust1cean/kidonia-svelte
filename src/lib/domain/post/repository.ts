import type { FetchRange, Id } from '../common/repository';
import type { PostCategory } from '$lib/domain/post/constants';
import type { Identify } from '$lib/utils/types';
import type { PostEntity } from './entity';

export interface PostRepository {
	fetchPosts(options: FetchPostsOptions): Promise<PostEntity[]>;
	fetchPostById(postId: Id): Promise<PostEntity | null>;
	createPost(postData: CreatePostData): Promise<void>;
	editPost(postId: Id, postData: EditPostData): Promise<void>;
	deletePostById(postId: Id): Promise<void | Error>;
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
	category?: PostCategory | null;
	draft: boolean;
	imagePath: string;
	minAge: number;
	maxAge: number;
	phone: string;
	zipcode?: number | null;
	price: number;
};

export type EditPostData = Partial<CreatePostData>;
