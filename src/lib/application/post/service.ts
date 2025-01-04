import type { FetchRange, PostId } from '$lib/domain/common/repository';
import { type PostCategory, type PostEntity } from '$lib/domain/post';
import type { Identify } from '$lib/utils/types';

export interface PostService {
	getAuthorPosts(getRequest: GetAuthorPostsRequest): Promise<PostEntity[]>;
	getAuthorDrafts(getRequest: GetAuthorDraftsRequest): Promise<PostEntity[]>;
	searchPosts(searchRequest: SearchPostsRequest): Promise<PostEntity[]>;
	createPost(createRequest: CreatePostRequest): Promise<void>;
	createDraft(createRequest: CreatePostRequest): Promise<void>;
	editPost(postId: PostId, request: UpdatePostRequest): Promise<void>;
	editDraft(postId: PostId, request: UpdatePostRequest): Promise<void>;
	deletePost(postId: PostId): Promise<void>;
}

export type GetAuthorPostsRequest = Identify<
	FetchRange & {
		authorId: PostId;
	}
>;

export type GetAuthorDraftsRequest = Identify<
	FetchRange & {
		authorId: PostId;
	}
>;

export type SearchPostsRequest = Identify<
	FetchRange & {
		query: string;
		minAge?: number;
		maxAge?: number;
		categories?: PostCategory[];
		address?: string;
		zipcode?: number;
	}
>;

export type CreatePostRequest = {
	title: string;
	authorId: string;
	zipcode: number;
	address: string;
	phone: string;
	description?: string;
	draft?: boolean;
	imagePath?: string;
	maxAge?: number;
	minAge?: number;
	price?: number | null;
	category?: PostCategory | null;
};

export type UpdatePostRequest = Partial<CreatePostRequest>;
