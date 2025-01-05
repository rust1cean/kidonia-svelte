import type { PostId } from '@/domain/common/repository';
import { MAX_AGE, MIN_AGE, type DetailedPostModel } from '@/domain/post';
import type {
	CreatePostPayload,
	GetAuthorPostsPayload,
	GetPostsPayload,
	EditPostPayload,
} from './payload';
import type { PostRepository } from './repository';
import type { PostService, PostStatus } from './service';

const isDraft = (status: PostStatus) => status === 'draft';

export class PostServiceImpl implements PostService {
	constructor(private repository: PostRepository) {}

	public async getAuthorPosts(
		payload: GetAuthorPostsPayload,
		status: PostStatus
	): Promise<DetailedPostModel[]> {
		return this.repository.fetchPosts({
			...payload,
			draft: isDraft(status)
		});
	}

	public async getPosts({
		offset,
		limit,
		minAge = MIN_AGE,
		maxAge = MAX_AGE,
		categories = [],
		address,
		zipcode,
		query = ''
	}: GetPostsPayload): Promise<DetailedPostModel[]> {
		return this.repository.fetchPosts({
			title: query,
			description: query,
			draft: false,
			offset,
			limit,
			minAge,
			maxAge,
			categories,
			address,
			zipcode
		});
	}

	public async createPost(
		{
			title,
			author,
			zipcode,
			address,
			phone,
			description = '',
			imagePath = '',
			maxAge = MAX_AGE,
			minAge = MIN_AGE,
			price = null,
			category = null
		}: CreatePostPayload,
		status: PostStatus
	): Promise<void> {
		return this.repository.createPost({
			draft: isDraft(status),
			title,
			author,
			zipcode,
			address,
			phone,
			category,
			description,
			imagePath,
			price,
			maxAge,
			minAge
		});
	}

	public async editPost(
		postId: PostId,
		request: EditPostPayload,
		status: PostStatus
	): Promise<void> {
		return this.repository.updatePost(postId, {
			...request,
			draft: isDraft(status)
		});
	}

	public async deletePost(postId: PostId): Promise<void> {
		return this.repository.deletePost(postId);
	}
}
