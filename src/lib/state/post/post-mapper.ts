import type { PostEntity } from '$lib/api/post';
import type { PostModel } from './post-model';

export const entityToModel = (entity: PostEntity): PostModel => ({
	id: entity.id,
	author: {
		id: entity.author.id,
		avatar: entity.author.avatar_url,
		name: entity.author.name
	},
	title: entity.title,
	gallery: [entity.image_path ?? ''],
	description: entity.description,
	address: entity.address,
	category: entity.category,
	draft: entity.draft,
	maxAge: entity.max_age,
	minAge: entity.min_age,
	phone: entity.phone,
	postcode: entity.postcode,
	price: entity.price,
	updatedAt: entity.updated_at
});
