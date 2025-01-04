import type { Merge, SetOptional } from 'type-fest';
import type { Tables } from '../types';

export type PostEntity = Merge<
	Tables<'post'>,
	{ author: SetOptional<Tables<'user'>, 'created_at'> }
>;
