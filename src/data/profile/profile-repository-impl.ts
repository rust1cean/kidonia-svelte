import type {
	CreateProfilePayload,
	ProfileRepository,
	UpdateProfilePayload
} from '@/application/profile';
import type { ProfileId } from '@/domain/common';
import type { ProfileEntity } from '@/domain/profile';
import type { ProfileDatasource } from './sources';

export class ProfileRepositoryImpl implements ProfileRepository {
	constructor(
		private local: ProfileDatasource,
		private remote: ProfileDatasource
	) {}

	public async getProfile(id: ProfileId): Promise<ProfileEntity | null> {
		const local = this.local.get(id);
		const remote = this.remote.get(id);

		return Promise.race([local, remote]);
	}

	public async createProfile(payload: CreateProfilePayload): Promise<ProfileEntity> {
		const local = this.local.add(payload);
		const remote = this.remote.add(payload);

		return Promise.race([local, remote]);
	}

	public async updateProfile(
		id: ProfileId,
		payload: UpdateProfilePayload
	): Promise<ProfileEntity | null> {
		const local = this.local.update(id, payload);
		const remote = this.remote.update(id, payload);

		return Promise.race([local, remote]);
	}

	public async deleteProfile(id: ProfileId): Promise<void> {
		const local = this.local.delete(id);
		const remote = this.remote.delete(id);

		return Promise.race([local, remote]);
	}
}
