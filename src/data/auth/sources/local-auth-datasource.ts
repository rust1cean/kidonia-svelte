import { db } from '@/data/db';
import type { SessionDatasource } from './interfaces';

export class LocalAuthDatasource implements SessionDatasource {
	public async getSession(): Promise<any> {
		const { data, error } = await db.auth.getSession();

		if (error) {
			throw error;
		}

		return data;
	}
}
