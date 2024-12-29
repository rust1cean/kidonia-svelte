import { z } from 'zod';

export type LoginFormSchema = typeof loginFormSchema;
export type SignupFormSchema = typeof signupFormSchema;

export const loginFormSchema = z
	.object({
		email: z
			.string({ required_error: 'Required' })
			.min(4, 'Email must be at least 4 characters')
			.max(50, 'Email must be less than 50 characters')
			.email(),
		password: z
			.string({ required_error: 'Required' })
			.min(5, 'Password must be at least 5 characters')
			.max(50, 'Password must be less than 50 characters')
			.trim()
	})
	.strict();

export const signupFormSchema = loginFormSchema
	.extend({
		avatar: z.instanceof(File).refine((f) => f.size < 2_000_000, 'Max 2 mB upload size'),
		name: z
			.string({ required_error: 'Required' })
			.min(4, 'Name must be at least 4 characters')
			.max(35, 'Name must be less than 35 characters')
			.trim(),
		confirmPassword: z
			.string({ required_error: 'Required' })
			.min(5, 'Confirm password must be at least 5 characters')
			.max(50, 'Confirm password must be less than 50 characters')
			.trim()
	})
	.partial({ avatar: true })
	.strict();
