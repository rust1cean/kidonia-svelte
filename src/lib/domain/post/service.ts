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

	public async createPost({}: CreatePostRequest): Promise<void> {}
}

export type GetPostsRequest = Identify<
	FetchRange & {
		authorId: Id;
	}
>;

export type SearchPostsRequest = Identify<
	FetchRange & {
		query: string;
		minAge: number;
		maxAge: number;
		categories: PostCategory[];
		address: string;
		zipcode: number;
	}
>;

export type CreatePostRequest = {
	title: string;
	description?: string | null;
	authorId: string;
	address?: string | null;
	category?: PostCategory | null;
	draft?: boolean | null;
	imagePath?: string | null;
	maxAge?: number | null;
	minAge?: number | null;
	phone: string;
	zipcode?: number | null;
	price?: number | null;
};
