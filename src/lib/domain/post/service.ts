import type { Identify } from '$lib/utils/types';
import type { FetchRange, PostId } from '../common/repository';
import { MAX_AGE, MIN_AGE, type PostCategory } from './constants';
import type { PostEntity } from './entity';
import type { PostRepository } from './repository';

export class PostService {
	constructor(private repository: PostRepository) {}

	public async getAuthorPosts({ offset, limit, authorId }: GetAuthorPostsRequest): Promise<PostEntity[]> {
		return this.repository.fetchPosts({
			draft: false,
			offset,
			limit,
			authorId
		});
	}

	public async getAuthorDrafts({ offset, limit, authorId }: GetAuthorPostsRequest): Promise<PostEntity[]> {
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
			zipcode,
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

export type GetAuthorPostsRequest = Identify<
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
