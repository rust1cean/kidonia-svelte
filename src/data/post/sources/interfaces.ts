import type { CreatePostData, FetchPostsOptions, UpdatePostData } from '@/application/post';
import type { PostId } from '@/domain/common';
import type { DetailedPostDto } from '@/domain/post';

export interface PostDatasource {
  fetchPosts({
    offset,
		limit,
		minAge,
		maxAge,
		draft,
		zipcode,
		title,
		description,
		categories,
		address
	}: FetchPostsOptions): Promise<Array<DetailedPostDto>>;
	fetchPostById(postId: PostId): Promise<DetailedPostDto | null>;
	createPost(post: CreatePostData): Promise<DetailedPostDto>;
  createManyPosts(...posts: CreatePostData[]): Promise<DetailedPostDto[]>;
	updatePost(postId: PostId, post: UpdatePostData): Promise<DetailedPostDto | null>;
	deletePost(postId: PostId): Promise<void>;
}
