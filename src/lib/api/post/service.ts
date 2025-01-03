import type { PostEntity } from './types';
import { db } from '..';
import type { CreatePostPayload, EditPostPayload, FilterPostsPayload } from './types';
import { MAX_AGE, MIN_AGE } from '$lib/common/post';
import type { Id } from '$lib/common';
import { POSTS_PER_ONCE } from '.';



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
