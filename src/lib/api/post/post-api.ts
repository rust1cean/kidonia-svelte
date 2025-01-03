import { injectable } from 'inversify';
import type { Id } from '$lib/common';
import { MAX_AGE, MIN_AGE } from '$lib/common/post';
import { db } from '..';
import { POSTS_PER_ONCE } from './constants';
import type { CreatePostPayload, EditPostPayload, FilterPostsPayload, PostEntity } from './types';

export interface PostProvider {
	fetchPosts(filters: FilterPostsPayload): Promise<PostEntity[]>;
	fetchPostById(id: Id): Promise<PostEntity | null>;
	createPost(post: CreatePostPayload): Promise<CreatePostPayload | null>;
	editPost(id: Id, post: EditPostPayload): Promise<EditPostPayload | null>;
	deletePostById(id: Id): Promise<void | Error>;
}

@injectable()
export class PostApi implements PostProvider {
	constructor(private fetchOffset: number = 0) {}

	public async fetchPosts({
		offset,
		limit = POSTS_PER_ONCE,
		draft = false,
		minAge = MIN_AGE,
		maxAge = MAX_AGE,
		categories = [],
		authorId,
		address,
		postcode,
		query
	}: FilterPostsPayload): Promise<PostEntity[]> {
		let q = db
			.from('post')
			.select('*, author(*)')
			.range(offset ?? this.fetchOffset, limit);

		if (query) q = q.ilike('title', `%${query}%`);
		if (categories) q = q.in('category', categories);
		if (minAge) q = q.gte('min_age', minAge);
		if (maxAge) q = q.lte('max_age', maxAge);
		if (draft) q = q.eq('draft', draft);
		if (address) q = q.eq('address', address);
		if (authorId) q = q.eq('author', authorId);
		if (postcode) q = q.eq('postcode', postcode);

		const { data, error } = await q;

		if (error) {
			throw error;
		}

		this.fetchOffset += data.length;

		return (data as never) ?? [];
	}

	public async fetchPostById(id: Id) {
		const { data, error } = await db.from('post').select('*, author(*)').eq('id', id).maybeSingle();

		if (error) {
			throw error;
		}

		return data;
	}

	public async createPost(post: CreatePostPayload): Promise<CreatePostPayload | null> {
		const { data, error } = await db
			.from('post')
			.insert(post as never)
			.select()
			.limit(1)
			.maybeSingle();

		if (error) {
			throw error;
		}

		return data;
	}

	public async editPost(id: Id, post: EditPostPayload): Promise<EditPostPayload | null> {
		const { data, error } = await db
			.from('post')
			.update(post as never)
			.eq('id', id)
			.select()
			.limit(1)
			.maybeSingle();

		if (error) {
			throw error;
		}

		return data;
	}

	public async deletePostById(id: Id): Promise<void | Error> {
		const { error } = await db.from('post').delete().eq('id', id);

		if (error) {
			throw error;
		}
	}
}
