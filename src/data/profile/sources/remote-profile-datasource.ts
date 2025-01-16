import camelize from 'camelize-ts';
import snakecaseKeys from 'snakecase-keys';
import type { UserId } from '@/domain/common';
import type { ProfileEntity } from '@/domain/profile';
import type { ProfileDatasource } from './profile-datasource';
import { db } from '@/data/db';
import type { CreateProfilePayload, UpdateProfilePayload } from '@/application/profile';

export class RemoteProfileDatasource implements ProfileDatasource {
	constructor() {}

	public async get(id: UserId): Promise<ProfileEntity | null> {
		const { data, error } = await db.from('user').select('*').eq('id', id).maybeSingle();

		if (error) {
			throw error;
		}

		return camelize(data);
	}

	public async add(profile: CreateProfilePayload): Promise<ProfileEntity> {
		const dto = snakecaseKeys(profile);
		const { data, error } = await db.from('user').insert(dto).select().single();

		if (error) {
			throw error;
		}

		return camelize(data);
	}

	public async addMany(...newProfiles: CreateProfilePayload[]): Promise<ProfileEntity[]> {
		const dtos = newProfiles.map((profile) => snakecaseKeys(profile));
		const { data, error } = await db.from('user').insert(dtos).select();

		if (error) {
			throw error;
		}

		return data.map((profile) => camelize(profile));
	}

	public async update(id: UserId, profile: UpdateProfilePayload): Promise<ProfileEntity | null> {
		const dto = snakecaseKeys(profile);
		const { data, error } = await db
			.from('user')
			.update(dto)
			.eq('id', id)
			.select()
			.single();

		if (error) {
			throw error;
		}

		return camelize(data);
	}

	public async delete(id: UserId): Promise<void> {
		const { error } = await db.from('user').delete().eq('id', id);

		if (error) {
			throw error;
		}
	}
}
