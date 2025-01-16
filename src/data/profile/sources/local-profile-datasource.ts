import type { UserId } from '@/domain/common';
import type { ProfileEntity } from '@/domain/profile';
import type { ProfileDatasource } from './interfaces';
import type { CreateProfilePayload, UpdateProfilePayload } from '@/application/profile';

type Profiles = { [key: UserId]: ProfileEntity };

const addCreatedAt = (profile: CreateProfilePayload | UpdateProfilePayload) => ({
	...profile,
	createdAt: Date.now().toString()
});

export class LocalProfileDatasource implements ProfileDatasource {
	constructor(private profiles: Profiles) {}

	public async get(id: UserId): Promise<ProfileEntity | null> {
		return this.profiles[id];
	}

	public async add(profile: CreateProfilePayload): Promise<ProfileEntity> {
		const entity = addCreatedAt(profile) as ProfileEntity;
		this.profiles[profile.id] = entity;

		return entity;
	}

	public async addMany(...newProfiles: CreateProfilePayload[]): Promise<ProfileEntity[]> {
		const { profiles } = this;
		const newEntities = newProfiles.map((profile) => addCreatedAt(profile) as ProfileEntity);

		for (const entity of newEntities) {
			profiles[entity.id] = entity;
		}

		return newEntities;
	}

	public async update(id: UserId, profile: UpdateProfilePayload): Promise<ProfileEntity | null> {
		const entity = {
			...this.profiles[id],
			...addCreatedAt(profile)
		} as ProfileEntity;

		this.profiles[id] = entity;

		return entity;
	}

	public async delete(id: UserId): Promise<void> {
		delete this.profiles[id];
	}
}
