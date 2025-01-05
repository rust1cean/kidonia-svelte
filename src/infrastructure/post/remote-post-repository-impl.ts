import { injectable } from 'inversify';
import camelize from 'camelize-ts';
import snakecaseKeys from 'snakecase-keys';
import type {
	CreatePostData,
	FetchPostsOptions,
	PostRepository,
	UpdatePostData
} from '@/application/post';
import { db } from '../db';
import type { PostId } from '@/domain/common/repository';
import type { DetailedPostModel } from '@/domain/post';
import { POSTS_PER_REQUEST_LIMIT } from '.';

@injectable()
export class RemotePostRepositoryImpl implements PostRepository {
	constructor() {}

	public async fetchPosts({
		offset,
		limit,
		minAge,
		maxAge,
		draft,
		zipcode,
		title,
		description,
		categories,
		address
	}: FetchPostsOptions): Promise<DetailedPostModel[]> {
		// TODO: DETAILED SQL VIEW
		// let q = db.from('posts_with_author').select('*');
		let q = db.from('post').select('*, author(*)');

		if (title) q = q.ilike('title', `%${title}%`);
		if (description) q = q.ilike('description', `%${description}%`);
		if (categories && categories.length > 0) q = q.in('category', categories);
		if (minAge) q = q.gte('min_age', minAge);
		if (maxAge) q = q.lte('max_age', maxAge);
		if (draft) q = q.eq('draft', draft);
		if (address) q = q.eq('address', address);
		// TODO: Postcode or zipcode
		if (zipcode) q = q.eq('postcode', zipcode);

		const { data, error } = await q.range(
			offset,
			limit > POSTS_PER_REQUEST_LIMIT ? POSTS_PER_REQUEST_LIMIT : limit
		);

		if (error) {
			throw error;
		}

		return data == null ? [] : data.map((post) => camelize(post) as DetailedPostModel);
	}

	public async fetchPostById(postId: PostId): Promise<DetailedPostModel | null> {
		const { data, error } = await db
			.from('posts_with_author')
			.select('*')
			.eq('id', postId)
			.maybeSingle();

		if (error) {
			throw error;
		}

		return data != null ? (camelize(data) as DetailedPostModel) : null;
	}

	public async createPost(post: CreatePostData): Promise<void> {
		const { error } = await db.from('post').insert({
			...snakecaseKeys(post),
			author: post.author.id
		});

		if (error) {
			throw error;
		}
	}

	public async updatePost(postId: PostId, post: UpdatePostData): Promise<void> {
		const { error } = await db
			.from('post')
			.update(post as never)
			.eq('id', postId);

		if (error) {
			throw error;
		}
	}

	public async deletePost(postId: PostId): Promise<void> {
		const { error } = await db.from('post').delete().eq('id', postId);

		if (error) {
			throw error;
		}
	}
}
