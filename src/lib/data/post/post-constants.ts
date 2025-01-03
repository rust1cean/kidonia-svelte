// IoC interfaces
export const POST_DEPENDENCY_ID = {
	EventProvider: Symbol.for('EventProvider'),
	PostProvider: Symbol.for('PostProvider'),
	NotifiablePostProvider: Symbol.for('NotifiablePostProvider')
};

// Fetch control
export const POSTS_PER_ONCE: number = 40;

// Post restrictions
export const PostCategories = [
	'sport',
	'math',
	'informatics',
	'art',
	'design',
	'architecture',
	'social_science',
	'biology',
	'ecology',
	'chemistry',
	'history',
	'programming'
] as const;
export type PostCategory = (typeof PostCategories)[number];
export const MIN_AGE: number = 0;
export const MAX_AGE: number = 18;
export const GREEK_PHONE_REGEXP = /^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/;
