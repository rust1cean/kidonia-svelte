import type { FetchRange, PostId } from '@/domain/common/repository';
import { MAX_AGE, MIN_AGE, type DetailedPostDto } from '@/domain/post';
import type {
	CreatePostPayload,
	GetAuthorPostsPayload,
	GetPostsPayload,
	EditPostPayload,
	SortBy
} from './payload';
import type { OrderBy, PostRepository } from './post-repository';
import type { PostService, PostState } from './post-service';

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
const isDraft = (state: PostState) => state === 'draft';

export class PostServiceImpl implements PostService {
	constructor(private repository: PostRepository) {}

	public async getAuthorPosts(
		range: FetchRange,
		payload: GetAuthorPostsPayload,
		state: PostState
	): Promise<DetailedPostDto[]> {
		return this.repository.fetchPosts({
			...range,
			...payload,
			orderBy: payload.sortBy ? determineSortBy(payload.sortBy) : null,
			draft: isDraft(state)
		});
	}

	public async getPosts(
		range: FetchRange,
		{
			minAge = MIN_AGE,
			maxAge = MAX_AGE,
			categories = [],
			address,
			zipcode,
			sortBy,
			query = ''
		}: GetPostsPayload
	): Promise<DetailedPostDto[]> {
		return this.repository.fetchPosts({
			...range,
			title: query,
			description: query,
			draft: false,
			orderBy: sortBy ? determineSortBy(sortBy) : null,
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
		state: PostState
	): Promise<void> {
		return this.repository.createPost({
			draft: isDraft(state),
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

	public async editPost(postId: PostId, request: EditPostPayload, state: PostState): Promise<void> {
		return this.repository.updatePost(postId, {
			...request,
			draft: isDraft(state)
		});
	}

	public async deletePost(postId: PostId): Promise<void> {
		return this.repository.deletePost(postId);
	}
}
