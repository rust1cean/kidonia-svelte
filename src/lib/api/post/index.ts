import type { Merge } from 'type-fest/source/merge';
import type { Tables } from '../types';

export type PostEntity = Merge<Tables<'post'>, { author: Tables<'user'> }>;

export * from "./post-service"
export * from "./post-constants"