import { injectable } from 'inversify';
import type { Id } from '$lib/common';
import { MAX_AGE, MIN_AGE } from '$lib/common/post';
import { db } from '..';
import { POSTS_PER_ONCE } from './constants';
import type { FilterPostsPayload, PostEntity } from './types';

export interface FetchProvider {
	fetchPosts(filters: FilterPostsPayload): Promise<PostEntity[]>;
	fetchPostById(id: Id): Promise<PostEntity | null>;
}

@injectable()
export class FetchService implements FetchProvider {
	constructor(private offset: number = 0) {}

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
			.range(offset ?? this.offset, limit);

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

		this.offset += data.length;

		return (data as never) ?? [];
	}

	public async fetchPostById(id: Id) {
		const { data, error } = await db.from('post').select('*, author(*)').eq('id', id).maybeSingle();

		if (error) {
			throw error;
		}

		return data;
	}
}
