import { MAX_AGE, MIN_AGE, type PostEntity } from '$lib/common/post';
import type { PostModel } from './model';

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
	address: entity.address ?? '',
	category: entity.category,
	draft: entity.draft,
	minAge: entity.min_age ?? MIN_AGE,
	maxAge: entity.max_age ?? MAX_AGE,
	phone: entity.phone,
	postcode: entity.postcode,
	price: entity.price ?? 0,
	updatedAt: new Date(Number(entity.updated_at!))
});

export const modelToEntity = (model: PostModel): PostEntity => ({
	id: model.id as string,
	author: {
		id: model.id as string,
		avatar_url: model.author.avatar!,
		name: model.author.name,
		role: 'author'
	},
	title: model.title,
	image_path: model.gallery[0],
	description: model.description ?? '',
	address: model.address!,
	category: model.category!,
	draft: model.draft ?? false,
	max_age: model.maxAge ?? MAX_AGE,
	min_age: model.minAge ?? MIN_AGE,
	phone: model.phone,
	postcode: model.postcode!,
	price: model.price!,
	updated_at: model.updatedAt.toString()
});
