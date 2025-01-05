import type { FetchRange, PostId } from '@/domain/common/repository';
import type { AuthorEntity, DetailedPostEntity } from '@/domain/post';
import type { PostCategory } from '@/domain/post/constants';
import type { Identify } from '@/utils/types';

export interface PostRepository {
	fetchPosts(options: FetchPostsOptions): Promise<DetailedPostEntity[]>;
	fetchPostById(postId: PostId): Promise<DetailedPostEntity | null>;
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
		categories?: Array<PostCategory>;
	}
>;

export type CreatePostData = {
	title: string;
	description: string;
	author: AuthorEntity;
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
