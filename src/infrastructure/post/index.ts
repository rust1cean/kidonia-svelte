import type { Merge } from 'type-fest';
import type { Tables } from '../db';

export * from './remote-post-repository-impl';
export * from './in-memory-post-repository-impl';
export * from './memory-first-post-repository-impl';

export const POSTS_PER_REQUEST_LIMIT: number = 40;

export type PostDto = Merge<Tables<'post'>, { author: Tables<'user'> }>;
