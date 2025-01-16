import {
	AuthServiceImpl,
	LogInUseCase,
	LogOutUseCase,
	SignUpUseCase,
	GetSessionUseCase,
	type AuthRepository
} from '@/application/auth';
import {
	AuthRepositoryImpl,
	LocalAuthDatasource,
	RemoteAuthDatasource,
	type AuthDatasource,
	type SessionDatasource
} from '@/data/auth';
import { Container } from 'inversify';

export const TYPES = {
	SessionDatasource: Symbol.for('SessionDatasource'),
	AuthDatasource: Symbol.for('AuthDatasource'),
	AuthRepository: Symbol.for('AuthRepository'),
	AuthService: Symbol.for('AuthService'),
	GetSessionUseCase: Symbol.for('GetSessionUseCase'),
	LogInUseCase: Symbol.for('LogInUseCase'),
	LogOutUseCase: Symbol.for('LogOutUseCase'),
	SignUpUseCase: Symbol.for('SignUpUseCase')
};

const container = new Container();

// Datasources
container.bind<SessionDatasource>(TYPES.SessionDatasource).to(LocalAuthDatasource);
container.bind<AuthDatasource>(TYPES.AuthDatasource).to(RemoteAuthDatasource);

// Repositories
container.bind<AuthRepository>(TYPES.AuthRepository).toDynamicValue(() => {
	const local = container.get<SessionDatasource>(TYPES.SessionDatasource);
	const remote = container.get<AuthDatasource>(TYPES.AuthDatasource);

	return new AuthRepositoryImpl(local, remote);
});

// Services
container
	.bind<AuthServiceImpl>(TYPES.AuthService)
	.toDynamicValue(() => new AuthServiceImpl(container.get<AuthRepository>(TYPES.AuthRepository)));

// Use-cases
container
	.bind<GetSessionUseCase>(TYPES.GetSessionUseCase)
	.toDynamicValue(() => new GetSessionUseCase(container.get<AuthServiceImpl>(TYPES.AuthService)));
container
	.bind<LogInUseCase>(TYPES.LogInUseCase)
	.toDynamicValue(() => new LogInUseCase(container.get<AuthServiceImpl>(TYPES.AuthService)));
container
	.bind<LogOutUseCase>(TYPES.LogOutUseCase)
	.toDynamicValue(() => new LogOutUseCase(container.get<AuthServiceImpl>(TYPES.AuthService)));
container
	.bind<SignUpUseCase>(TYPES.SignUpUseCase)
	.toDynamicValue(() => new SignUpUseCase(container.get<AuthServiceImpl>(TYPES.AuthService)));

export { container as authContainer };
