import { injectable } from 'inversify';
import camelize from 'camelize-ts';
import type {
	CreatePostData,
	FetchPostsOptions,
	PostRepository,
	UpdatePostData
} from '$lib/application/post';
import { db } from '../db';
import type { PostId } from '$lib/domain/common/repository';
import type { PostEntity } from '$lib/domain/post';

export const POSTS_PER_REQUEST_LIMIT: number = 40;

@injectable()
export class PostRepositoryImpl implements PostRepository {
	constructor(private fetchOffset: number = 0) {}

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
	}: FetchPostsOptions): Promise<PostEntity[]> {
		let q = db
			.from('post')
			.select('*, author(*)')
			.range(offset ?? this.fetchOffset, limit);

		if (title) q = q.ilike('title', `%${title}%`);
		if (description) q = q.ilike('description', `%${description}%`);
		if (categories) q = q.in('category', categories);
		if (minAge) q = q.gte('min_age', minAge);
		if (maxAge) q = q.lte('max_age', maxAge);
		if (draft) q = q.eq('draft', draft);
		if (address) q = q.eq('address', address);
		// TODO: Postcode or zipcode
		if (zipcode) q = q.eq('postcodecode', zipcode);

		const { data, error } = await q;

		if (error) {
			throw error;
		}

		this.fetchOffset += data.length;

		return data == null ? [] : data.map(camelize as any);
	}

	public async fetchPostById(id: PostId): Promise<PostEntity | null> {
		const { data, error } = await db.from('post').select('*, author(*)').eq('id', id).maybeSingle();

		if (error) {
			throw error;
		}

		return data != null ? (camelize(data) as PostEntity) : null;
	}

	public async createPost(post: CreatePostData): Promise<void> {
		const { error } = await db.from('post').insert(post as never);

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
