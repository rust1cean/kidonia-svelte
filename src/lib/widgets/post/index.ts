export { default as Post } from './post.svelte';

export type PostProps = {
	editorMode: boolean;
	gallery: string[];
	title: string;
	description?: string | null;
	address?: string | null;
	phone?: string | null;
	education?: string | null;
	minAge?: string | number;
	maxAge?: string | number;
	price?: number | null | string;
	author: {
		id: string | number;
		avatar?: string | null;
		name: string;
	};
}
