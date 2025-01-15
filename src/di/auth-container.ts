import {
	AuthServiceImpl,
	LogInUseCase,
	LogOutUseCase,
	SignUpUseCase,
	type AuthRepository
} from '@/application/auth';
import { AuthRepositoryImpl } from '@/data/auth';
import { Container } from 'inversify';

export const TYPES = {
	AuthRepository: Symbol.for('AuthRepository'),
	AuthService: Symbol.for('AuthService'),
	LogInUseCase: Symbol.for('LogInUseCase'),
	LogOutUseCase: Symbol.for('LogOutUseCase'),
	SignUpUseCase: Symbol.for('SignUpUseCase')
};

const container = new Container();

// Repositories
container.bind<AuthRepository>(TYPES.AuthRepository).to(AuthRepositoryImpl);

// Services
container
	.bind<AuthServiceImpl>(TYPES.AuthService)
	.toDynamicValue(() => new AuthServiceImpl(container.get<AuthRepository>(TYPES.AuthRepository)));

// Use-cases
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
