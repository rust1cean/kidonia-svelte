import { db } from '..';
import type { AuthError } from '@supabase/supabase-js';
import type { CreateUserPayload } from './auth-payload';

export const signInRequest = async (credentials: { email: string; password: string }) => {
	const { data, error } = await db.auth.signInWithPassword(credentials);

	if (error) {
		throw error;
	}

	return data;
};

export const signUpRequest = async (credentials: CreateUserPayload) => {
	const { data, error } = await db.auth.signUp(credentials);

	if (error) {
		throw error;
	}

	return data;
};

export const logOutRequest = async (): Promise<void | AuthError> => {
	const { error } = await db.auth.signOut();

	if (error) {
		throw error;
	}
};
