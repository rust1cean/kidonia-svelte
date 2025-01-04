import type { Identify } from '$lib/utils/types';
import type { FetchRange, Id } from '../common/repository';
import { MAX_AGE, MIN_AGE, type PostCategory } from './constants';
import type { PostEntity } from './entity';
import type { PostRepository } from './repository';

export class PostService {
	constructor(private repository: PostRepository) {}

	public async getPosts({ offset, limit, authorId }: GetPostsRequest): Promise<PostEntity[]> {
		return this.repository.fetchPosts({
			draft: false,
			offset,
			limit,
			authorId
		});
	}

	public async getDrafts({ offset, limit, authorId }: GetPostsRequest): Promise<PostEntity[]> {
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
			draft: false,
			offset,
			limit,
			minAge,
			maxAge,
			categories,
			address,
			zipcode,
			query
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

	public async editPost(postId: Id, request: UpdatePostRequest): Promise<void> {
		return this.repository.updatePost(postId, {
			...request,
			draft: false
		});
	}

	public async editDraft(postId: Id, request: UpdatePostRequest): Promise<void> {
		return this.repository.updatePost(postId, {
			...request,
			draft: true
		});
	}

	public async deletePost(postId: Id): Promise<void> {
		return this.repository.deletePost(postId);
	}
}

export type GetPostsRequest = Identify<
	FetchRange & {
		authorId: Id;
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
