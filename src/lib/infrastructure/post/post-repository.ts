import { injectable } from 'inversify';
import type { Id } from '$lib/common';
import { MAX_AGE, MIN_AGE } from '$lib/presentation/greek_phone_regex';
import { db } from '..';
import { POSTS_PER_ONCE } from './constants';
import type {
	CreatePostPayload,
	EditPostPayload,
	FilterPostsPayload,
	PostEntity
} from '../../domain/repository/post/payload';

export const POSTS_PER_REQUEST_LIMIT: number = 40;

@injectable()
export class PostRepository implements PostProvider {
	constructor(private fetchOffset: number = 0) {}

	public async fetchPosts({}: FilterPostsPayload): Promise<PostEntity[]> {
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
		// TODO: Postcode or zipcode
		if (zipcode) q = q.eq('zipcode', zipcode);

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