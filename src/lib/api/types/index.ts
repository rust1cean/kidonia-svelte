import type { Tables } from './database.types';

export * from './database.types';

export type TableNames = unknown extends Tables<infer U> ? U : never;

export type FetchRange = {
	offset: number;
	limit: number;
};
