import type { PostId } from '@/domain/common/repository';
import { MAX_AGE, MIN_AGE, type DetailedPostDto } from '@/domain/post';
import type {
	CreatePostPayload,
	GetAuthorPostsPayload,
	GetPostsPayload,
	EditPostPayload,
	SortBy
} from './payload';
import type { OrderBy, PostRepository } from './repository';
import type { PostService, PostStatus } from './service';

const determineSortBy = (sort?: SortBy | null): OrderBy => {
	if (sort === 'oldest')
		return {
			column: 'updated_at',
			ascending: true
		};
	return {
		column: 'updated_at',
		ascending: false
	};
};
const isDraft = (status: PostStatus) => status === 'draft';

export class PostServiceImpl implements PostService {
	constructor(private repository: PostRepository) {}

	public async getAuthorPosts(
		payload: GetAuthorPostsPayload,
		status: PostStatus
	): Promise<DetailedPostDto[]> {
		return this.repository.fetchPosts({
			...payload,
			orderBy: payload.sortBy ? determineSortBy(payload.sortBy) : null,
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
		sortBy,
		query = ''
	}: GetPostsPayload): Promise<DetailedPostDto[]> {
		return this.repository.fetchPosts({
			title: query,
			description: query,
			draft: false,
			orderBy: sortBy ? determineSortBy(sortBy) : null,
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
