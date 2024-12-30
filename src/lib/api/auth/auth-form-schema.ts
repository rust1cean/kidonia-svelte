import {
	partial,
	pipe,
	object,
	string,
	minLength,
	maxLength,
	email,
	trim,
	file,
	maxSize,
	mimeType
} from 'valibot';

export type LoginFormSchema = typeof loginFormSchema;
export type SignupFormSchema = typeof signupFormSchema;

export const loginFormSchema = object({
	email: pipe(
		string('Required'),
		minLength(4, 'Email must be at least 4 characters'),
		maxLength(50, 'Email must be less than 50 characters'),
		email()
	),
	password: pipe(
		string('Required'),
		minLength(5, 'Password must be at least 5 characters'),
		maxLength(50, 'Password must be less than 50 characters'),
		trim()
	)
});

export const signupFormSchema = partial(
	object({
		name: pipe(
			string('Please enter your name'),
			minLength(4, 'Name must be at least 4 characters'),
			maxLength(35, 'Name must be less than 35 characters'),
			trim()
		),
		email: pipe(
			string('Please enter your email'),
			minLength(4, 'Email must be at least 4 characters'),
			maxLength(50, 'Email must be less than 50 characters'),
			email()
		),
		password: pipe(
			string('Please enter your password'),
			minLength(5, 'Password must be at least 5 characters'),
			maxLength(50, 'Password must be less than 50 characters'),
			trim()
		),
		confirmPassword: pipe(
			string('Please confirm your password'),
			minLength(5, 'Confirm password must be at least 5 characters'),
			maxLength(50, 'Confirm password must be less than 50 characters'),
			trim()
		),
		avatar: pipe(
			file(),
			mimeType(['image/jpeg', 'image/png'], 'Please select a JPEG or PNG file'),
			maxSize(1024 * 1024 * 2, 'Please select an avatar smaller than 2 MB')
		)
	}),
	['avatar']
);
