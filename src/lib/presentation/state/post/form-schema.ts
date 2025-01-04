import * as v from 'valibot';
import {
	GREEK_PHONE_REGEXP,
	MAX_AGE,
	MIN_AGE,
	PostCategories
} from '$lib/repository/post/constants';

export type ModifyPostFormSchema = typeof modifyPostFormSchema;

export const modifyPostFormSchema = v.pipe(
	v.partial(
		v.object({
			gallery: v.array(v.pipe(v.file(), v.maxSize(1024 * 1024 * 20, 'Max 20 mB upload size'))),
			title: v.pipe(
				v.string('Title is required'),
				v.minLength(4, 'Title must be at least 4 characters'),
				v.maxLength(50, 'Title must be less than 50 characters')
			),
			description: v.optional(
				v.pipe(v.string(), v.maxLength(1200, 'Email must be less than 1200 characters')),
				''
			),
			address: v.pipe(
				v.string('Address is required'),
				v.minLength(4, 'Address must be at least 4 characters'),
				v.maxLength(80, 'Address must be less than 80 characters')
			),
			postcode: v.pipe(
				v.number(),
				v.minValue(10_000, 'Postal code must contain 5 digits'),
				v.maxValue(99_999, 'Postal code must contain 5 digits')
			),
			phone: v.pipe(
				v.string(),
				v.regex(GREEK_PHONE_REGEXP),
				v.minLength(4, 'Phone must be at least 4 characters'),
				v.maxLength(30, 'Phone must be less than 30 characters')
			),
			price: v.optional(v.pipe(v.number(), v.minValue(0), v.maxValue(1_000)), 0),
			minAge: v.optional(v.pipe(v.number(), v.minValue(MIN_AGE), v.maxValue(MAX_AGE)), 0),
			maxAge: v.optional(v.pipe(v.number(), v.minValue(MIN_AGE), v.maxValue(MAX_AGE)), MAX_AGE),
			category: v.picklist(PostCategories),
			draft: v.optional(v.boolean(), false)
		}),
		['gallery', 'description', 'price', 'maxAge', 'category']
	),
	v.check(
		({ minAge, maxAge }) => maxAge != null && minAge <= maxAge,
		"Min age can't be greater than max age"
	)
);
