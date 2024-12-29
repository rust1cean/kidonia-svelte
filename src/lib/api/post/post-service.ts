import type { Merge } from 'type-fest';
import type { PostEntity } from '.';
import { db } from '..';
import type { Id, BaseFetchOptions } from '../types';
import type { CreatePostPayload, EditPostPayload, FetchPostsPayload } from './post-payload';
import { MAX_AGE, MIN_AGE } from '.';

export const fetchPosts = async ({
	offset = 0,
	limit = 40,
	draft = false,
	min_age = MIN_AGE,
	max_age = MAX_AGE,
	categories,
	author_id,
	address,
	postcode,
	query
}: Merge<BaseFetchOptions, FetchPostsPayload> = {}): Promise<PostEntity[]> => {
	let q = db.from('post').select('*, author(*)').range(offset, limit);

	if (query) q = q.ilike('title', `%${query}%`);
	if (categories) q = q.in('category', categories);
	if (min_age) q = q.gte('min_age', min_age);
	if (max_age) q = q.lte('max_age', max_age);
	if (draft) q = q.eq('draft', draft);
	if (address) q = q.eq('address', address);
	if (author_id) q = q.eq('author', author_id);
	if (postcode) q = q.eq('postcode', postcode);

	const { data, error } = await q;

	if (error) {
		throw error;
	}

	return (data as never) ?? [];
};

export const fetchPostById = async (id: Id) => {
	const { data, error } = await db.from('post').select('*, author(*)').eq('id', id).maybeSingle();

	if (error) {
		throw error;
	}

	return data;
};

export const createPost = async (post: CreatePostPayload): Promise<CreatePostPayload | null> => {
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
};

export const editPost = async (id: Id, post: EditPostPayload): Promise<EditPostPayload | null> => {
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
};

export const deletePostById = async (id: Id): Promise<void | Error> => {
	const { error } = await db.from('post').delete().eq('id', id);

	if (error) {
		throw error;
	}
};