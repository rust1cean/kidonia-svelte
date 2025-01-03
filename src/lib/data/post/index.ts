import type { Merge } from 'type-fest/source/merge';
import type { Tables } from '../types';
import type { SetOptional } from 'type-fest';

export type PostEntity = Merge<
	Tables<'post'>,
	{ author: SetOptional<Tables<'user'>, 'created_at'> }
>;

export { default as postContainer } from './di';
export * from './service';
export * from './constants';
export * from './payload';
export * from './mapper';
export * from './repository';
