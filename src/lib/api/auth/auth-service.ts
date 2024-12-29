import { db } from '..';
import type { AuthError } from '@supabase/supabase-js';
import type { CreateUserPayload } from './auth-payload';

export const signIn = async (email: string, password: string) => {
  const { data, error } = await db.auth.signInWithPassword({ email, password });

  if (error) {
    throw error;
  }

  return data;
};

export const signUp = async (credentials: CreateUserPayload) => {
  const { data, error } = await db.auth.signUp(credentials);

  if (error) {
    throw error;
  }

  return data;
};

export const signOut = async (): Promise<void | AuthError> => {
  const { error } = await db.auth.signOut();

  if (error) {
    throw error;
  }
};