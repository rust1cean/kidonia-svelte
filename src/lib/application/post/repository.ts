import type { AuthorId, FetchRange, PostId } from '$lib/domain/common/repository';
import type { PostEntity } from '$lib/domain/post';
import type { PostCategory } from '$lib/domain/post/constants';
import type { Identify } from '$lib/utils/types';

export interface PostRepository {
	fetchPosts(options: FetchPostsOptions): Promise<PostEntity[]>;
	fetchPostById(postId: PostId): Promise<PostEntity | null>;
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
	authorId: AuthorId;
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
