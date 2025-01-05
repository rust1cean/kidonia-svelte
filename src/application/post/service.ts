import type { PostId } from '@/domain/common/repository';
import type { DetailedPostEntity } from '@/domain/post';
import type {
	CreatePostPayload,
	GetAuthorPostsPayload,
	SearchPostsPayload,
	EditPostPayload
} from './payload';

export type PostStatus = 'published' | 'draft';

export interface PostService {
	getAuthorPosts(payload: GetAuthorPostsPayload, status: PostStatus): Promise<DetailedPostEntity[]>;
	searchPosts(payload: SearchPostsPayload): Promise<DetailedPostEntity[]>;
	createPost(payload: CreatePostPayload, status: PostStatus): Promise<void>;
	editPost(postId: PostId, payload: EditPostPayload, status: PostStatus): Promise<void>;
	deletePost(postId: PostId): Promise<void>;
}
