import type { Id } from '$lib/utils/types';

export type CreateFavoritePayload = {
	author_id: Id;
	post_id: Id;
};
