import type { PostEntity } from '.';
import { db } from '..';
import type { CreatePostPayload, EditPostPayload, FilterPostsPayload } from './payload';
import { MAX_AGE, MIN_AGE, POSTS_PER_ONCE } from '.';
import type { Id } from '$lib/utils/types';

export const fetchPosts = async ({
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
}: FilterPostsPayload): Promise<PostEntity[]> => {
	let q = db.from('post').select('*, author(*)').range(offset, limit);

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