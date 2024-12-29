import { z } from 'zod';
import { GREEK_PHONE_REGEXP, MAX_AGE, MIN_AGE, PostCategories } from './post-constants';

export type ModifyPostFormSchema = typeof modifyPostFormSchema;

export const modifyPostFormSchema = z
	.object({
		gallery: z
			.instanceof(File)
			.refine((img) => img.size < 20_000_000, 'Max 20 mB upload size')
			.array(),
		title: z
			.string({ required_error: 'Required' })
			.min(4, 'Title must be at least 4 characters')
			.max(50, 'Title must be less than 50 characters'),
		description: z.string().max(1200, 'Email must be less than 1200 characters').default(''),
		address: z
			.string({ required_error: 'Required' })
			.min(4, 'Address must be at least 4 characters')
			.max(80, 'Address must be less than 80 characters'),
		postcode: z
			.number()
			.min(10_000, 'Postal code must contain 5 digits')
			.max(99_999, 'Postal code must contain 5 digits'),
		phone: z
			.string()
			.regex(GREEK_PHONE_REGEXP)
			.min(4, 'Phone must be at least 4 characters')
			.max(30, 'Phone must be less than 30 characters'),
		price: z.number().nonnegative().max(1_000).default(0),
		minAge: z.number().nonnegative().min(MIN_AGE).default(0),
		maxAge: z.number().nonnegative().max(MAX_AGE).default(MAX_AGE),
		category: z.enum(PostCategories),
		draft: z.boolean().default(false)
	})
	.partial({ gallery: true, description: true, price: true, maxAge: true, category: true })
	.strict()
	.refine(({ minAge, maxAge }) => maxAge != null && minAge <= maxAge, {
		message: "Min age can't be greater than max age",
		path: ['minAge']
	});
