import type { PostId } from '$lib/domain/common/repository';
import type { PostEntity } from '$lib/domain/post';
import type {
	CreatePostPayload,
	GetAuthorPostsPayload,
	SearchPostsPayload,
	EditPostPayload
} from './payload';

export type PostStatus = 'published' | 'draft';

export interface PostService {
	getAuthorPosts(payload: GetAuthorPostsPayload, status: PostStatus): Promise<PostEntity[]>;
	searchPosts(payload: SearchPostsPayload): Promise<PostEntity[]>;
	createPost(payload: CreatePostPayload, status: PostStatus): Promise<void>;
	editPost(postId: PostId, payload: EditPostPayload, status: PostStatus): Promise<void>;
	deletePost(postId: PostId): Promise<void>;
}
