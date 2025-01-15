import { db } from '../db';
import type { AuthRepository, LogInPayload, SignUpPayload } from '@/application/auth';

export class AuthRepositoryImpl implements AuthRepository {
	constructor() {}

	public async logIn(payload: LogInPayload): Promise<void> {
		const { error } = await db.auth.signInWithPassword(payload);

		if (error) {
			throw error;
		}
	}

	public async signUp(payload: SignUpPayload): Promise<void> {
		const { error } = await db.auth.signUp(payload);

		if (error) {
			throw error;
		}
	}

	public async logOut(): Promise<void> {
		const { error } = await db.auth.signOut();

		if (error) {
			throw error;
		}
	}
}
