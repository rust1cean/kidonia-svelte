import type { Id } from '$lib/utils/types';

export type FavoriteItem = { id: Id };

export class FavoriteModel<Item extends FavoriteItem> {
	constructor(
		public id: Id,
		public item: Item
	) {}
}
