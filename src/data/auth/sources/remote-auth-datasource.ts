import type { LogInPayload, SignUpPayload } from '@/application/auth';
import { db } from '@/data/db';
import type { AuthDatasource } from './interfaces';

export class RemoteAuthDatasource implements AuthDatasource {
	constructor() {}

	public async logIn(payload: LogInPayload): Promise<void> {
		const { error } = await db.auth.signInWithPassword(payload);

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

	public async signUp(payload: SignUpPayload): Promise<void> {
		const { error } = await db.auth.signUp(payload);

		if (error) {
			throw error;
		}
	}
}
