import type { Merge } from 'type-fest';
import type { Tables } from '../db';

export type PostDto = Merge<Tables<'post'>, { author: Tables<'user'> }>;
