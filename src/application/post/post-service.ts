import type { FetchRange, PostId } from '@/domain/common';
import type { DetailedPostDto } from '@/domain/post';
import type {
	CreatePostPayload,
	GetAuthorPostsPayload,
	EditPostPayload,
	GetPostsPayload
} from './post-payload';

export type PostState = 'published' | 'draft';

export interface PostService {
	getPosts(fetchRange: FetchRange, payload: GetPostsPayload): Promise<DetailedPostDto[]>;
	getAuthorPosts(
		fetchRange: FetchRange,
		payload: GetAuthorPostsPayload,
		state: PostState
	): Promise<DetailedPostDto[]>;
	createPost(payload: CreatePostPayload, state: PostState): Promise<void>;
	editPost(postId: PostId, payload: EditPostPayload, state: PostState): Promise<void>;
	deletePost(postId: PostId): Promise<void>;
}
