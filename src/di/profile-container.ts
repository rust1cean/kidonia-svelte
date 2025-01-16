import { Container } from 'inversify';
import {
	CreateProfileUseCase,
	DeleteProfileUseCase,
	EditProfileUseCase,
	GetProfileUseCase,
	ProfileServiceImpl,
	type ProfileRepository,
	type ProfileService
} from '@/application/profile';
import {
	LocalProfileDatasource,
	RemoteProfileDatasource,
	type ProfileDatasource
} from '@/data/profile/sources';
import { ProfileRepositoryImpl } from '@/data/profile/profile-repository-impl';

export const TYPES = {
	ProfileDatasource: Symbol.for('ProfileDatasource'),
	ProfileRepository: Symbol.for('ProfileRepository'),
	ProfileService: Symbol.for('ProfileService'),
	CreateProfileUseCase: Symbol.for('CreateProfileUseCase'),
	GetProfileUseCase: Symbol.for('GetProfileUseCase'),
	EditProfileUseCase: Symbol.for('EditProfileUseCase'),
	DeleteProfileUseCase: Symbol.for('DeleteProfileUseCase')
};

const container = new Container();

// Datasources
container
	.bind<ProfileDatasource>(TYPES.ProfileDatasource)
	.to(LocalProfileDatasource)
	.whenTargetNamed('local');
container
	.bind<ProfileDatasource>(TYPES.ProfileDatasource)
	.to(RemoteProfileDatasource)
	.whenTargetNamed('remote');

// Repositories
container.bind<ProfileRepository>(TYPES.ProfileRepository).toDynamicValue(() => {
	const local = container.getNamed<ProfileDatasource>(TYPES.ProfileDatasource, 'local');
	const remote = container.getNamed<ProfileDatasource>(TYPES.ProfileDatasource, 'remote');

	return new ProfileRepositoryImpl(local, remote);
});

// Services
container.bind<ProfileService>(TYPES.ProfileService).toDynamicValue(() => {
	return new ProfileServiceImpl(container.get<ProfileRepository>(TYPES.ProfileRepository));
});

// Use-cases
container
	.bind<CreateProfileUseCase>(TYPES.CreateProfileUseCase)
	.toDynamicValue(
		() => new CreateProfileUseCase(container.get<ProfileService>(TYPES.ProfileService))
	);
container
	.bind<GetProfileUseCase>(TYPES.GetProfileUseCase)
	.toDynamicValue(() => new GetProfileUseCase(container.get<ProfileService>(TYPES.ProfileService)));
container
	.bind<EditProfileUseCase>(TYPES.EditProfileUseCase)
	.toDynamicValue(
		() => new EditProfileUseCase(container.get<ProfileService>(TYPES.ProfileService))
	);
container
	.bind<DeleteProfileUseCase>(TYPES.DeleteProfileUseCase)
	.toDynamicValue(
		() => new DeleteProfileUseCase(container.get<ProfileService>(TYPES.ProfileService))
	);

export { container as postContainer };
