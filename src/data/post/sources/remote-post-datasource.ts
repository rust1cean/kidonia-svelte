import { injectable } from 'inversify';
import camelize from 'camelize-ts';
import snakecaseKeys from 'snakecase-keys';
import type {
	CreatePostData,
	CreatePostPayload,
	FetchPostsOptions,
	UpdatePostData
} from '@/application/post';
import type { PostId } from '@/domain/common';
import type { DetailedPostDto, PostEntity } from '@/domain/post';
import { db } from '@/data/db';
import { POSTS_PER_REQUEST_LIMIT } from '../post-constants';
import type { PostDatasource } from './post-datasource';

const toDto = (post: CreatePostPayload) => ({
	...snakecaseKeys(post),
	author: post.author.id
});

@injectable()
export class RemotePostDatasource implements PostDatasource {
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
		address,
		orderBy
	}: FetchPostsOptions): Promise<DetailedPostDto[]> {
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
		if (orderBy) q = q.order(orderBy.column, { ascending: orderBy.ascending });

		const { data, error } = await q.range(
			offset,
			offset + (limit > POSTS_PER_REQUEST_LIMIT ? POSTS_PER_REQUEST_LIMIT : limit) - 1
		);

		if (error) {
			throw error;
		}

		return data.map((post) => camelize(post) as DetailedPostDto);
	}

	public async fetchPostById(postId: PostId): Promise<DetailedPostDto | null> {
		const { data, error } = await db
			.from('posts_with_author')
			.select('*')
			.eq('id', postId)
			.maybeSingle();

		if (error) {
			throw error;
		}

		return camelize(data);
	}

	public async createPost(post: CreatePostData): Promise<DetailedPostDto> {
		const { data, error } = await db.from('post').insert(toDto(post)).select().single();

		if (error) {
			throw error;
		}

		return camelize(data);
	}

	public async createManyPosts(...posts: CreatePostData[]): Promise<DetailedPostDto[]> {
		const dtos = posts.map((post) => toDto(post));
		const { data, error } = await db.from('post').insert(dtos).select();

		if (error) {
			throw error;
		}

		const entities = data.map((post) => camelize(post));

		return entities;
	}

	public async updatePost(postId: PostId, post: UpdatePostData): Promise<DetailedPostDto | null> {
		const { data, error } = await db
			.from('post')
			.update(post as never)
			.eq('id', postId)
			.select()
			.single();

		if (error) {
			throw error;
		}

		return camelize(data);
	}

	public async deletePost(postId: PostId): Promise<void> {
		const { error } = await db.from('post').delete().eq('id', postId);

		if (error) {
			throw error;
		}
	}
}
