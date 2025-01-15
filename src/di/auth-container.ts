import {
	AuthServiceImpl,
	LogInUseCase,
	LogOutUseCase,
	SignUpUseCase,
	type AuthRepository
} from '@/application/auth';
import { AuthRepositoryImpl } from '@/infrastructure/auth';
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
container.bind<AuthRepository>(TYPES.AuthRepository).toConstantValue(new AuthRepositoryImpl());

// Services
container
	.bind<AuthServiceImpl>(TYPES.AuthService)
	.toConstantValue(new AuthServiceImpl(container.get<AuthRepository>(TYPES.AuthRepository)));

// Use-cases
container
	.bind<LogInUseCase>(TYPES.LogInUseCase)
	.toConstantValue(new LogInUseCase(container.get<AuthServiceImpl>(TYPES.AuthService)));
container
	.bind<LogOutUseCase>(TYPES.LogOutUseCase)
	.toConstantValue(new LogOutUseCase(container.get<AuthServiceImpl>(TYPES.AuthService)));
container
	.bind<SignUpUseCase>(TYPES.SignUpUseCase)
	.toConstantValue(new SignUpUseCase(container.get<AuthServiceImpl>(TYPES.AuthService)));
