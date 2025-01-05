import type { PostId } from '@/domain/common/repository';
import type { DetailedPostDto } from '@/domain/post';
import type {
	CreatePostPayload,
	GetAuthorPostsPayload,
	EditPostPayload,
	GetPostsPayload
} from './payload';

export type PostStatus = 'published' | 'draft';

export interface PostService {
	getPosts(payload: GetPostsPayload): Promise<DetailedPostDto[]>;
	getAuthorPosts(payload: GetAuthorPostsPayload, status: PostStatus): Promise<DetailedPostDto[]>;
	createPost(payload: CreatePostPayload, status: PostStatus): Promise<void>;
	editPost(postId: PostId, payload: EditPostPayload, status: PostStatus): Promise<void>;
	deletePost(postId: PostId): Promise<void>;
}
