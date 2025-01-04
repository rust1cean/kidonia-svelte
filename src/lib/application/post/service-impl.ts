import type { PostId } from '$lib/domain/common/repository';
import { MAX_AGE, MIN_AGE, type PostEntity } from '$lib/domain/post';
import type { PostRepository } from './repository';
import type { CreatePostRequest, GetAuthorDraftsRequest, GetAuthorPostsRequest, SearchPostsRequest, UpdatePostRequest } from './service';

export class PostService {
	constructor(private repository: PostRepository) {}

	public async getAuthorPosts({
		offset,
		limit,
		authorId
	}: GetAuthorPostsRequest): Promise<PostEntity[]> {
		return this.repository.fetchPosts({
			draft: false,
			offset,
			limit,
			authorId
		});
	}

	public async getAuthorDrafts({
		offset,
		limit,
		authorId
	}: GetAuthorDraftsRequest): Promise<PostEntity[]> {
		return this.repository.fetchPosts({
			draft: true,
			offset,
			limit,
			authorId
		});
	}

	public async searchPosts({
		offset,
		limit,
		minAge = MIN_AGE,
		maxAge = MAX_AGE,
		categories = [],
		address,
		zipcode,
		query
	}: SearchPostsRequest): Promise<PostEntity[]> {
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

	public async createPost({
		title,
		authorId,
		zipcode,
		address,
		phone,
		description = '',
		imagePath = '',
		maxAge = MAX_AGE,
		minAge = MIN_AGE,
		price = null,
		category = null
	}: CreatePostRequest): Promise<void> {
		return this.repository.createPost({
			title,
			authorId,
			zipcode,
			address,
			phone,
			category,
			description,
			imagePath,
			price,
			maxAge,
			minAge,
			draft: false
		});
	}

	public async createDraft({
		title,
		authorId,
		zipcode,
		address,
		phone,
		description = '',
		imagePath = '',
		maxAge = MAX_AGE,
		minAge = MIN_AGE,
		price = null,
		category = null
	}: CreatePostRequest): Promise<void> {
		return this.repository.createPost({
			title,
			authorId,
			zipcode,
			address,
			phone,
			category,
			description,
			imagePath,
			price,
			maxAge,
			minAge,
			draft: true
		});
	}

	public async editPost(postId: PostId, request: UpdatePostRequest): Promise<void> {
		return this.repository.updatePost(postId, {
			...request,
			draft: false
		});
	}

	public async editDraft(postId: PostId, request: UpdatePostRequest): Promise<void> {
		return this.repository.updatePost(postId, {
			...request,
			draft: true
		});
	}

	public async deletePost(postId: PostId): Promise<void> {
		return this.repository.deletePost(postId);
	}
}
