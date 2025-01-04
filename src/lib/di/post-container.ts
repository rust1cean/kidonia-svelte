import { Container } from 'inversify';
import {
	InMemoryPostRepository,
	MemoryFirstPostRepositoryImpl,
	RemotePostRepositoryImpl
} from '$lib/infrastructure/post';
import { type PostRepository, type PostService, PostServiceImpl } from '$lib/application/post';

export const TYPES = {
	PostRepository: Symbol.for('PostRepository'),
	PostService: Symbol.for('PostService')
};

const container = new Container();

container
	.bind<PostRepository>(TYPES.PostRepository)
	.to(RemotePostRepositoryImpl)
	.whenTargetNamed('remote');

container
	.bind<PostRepository>(TYPES.PostRepository)
	.to(InMemoryPostRepository)
	.whenTargetNamed('in-memory');

container
	.bind<PostRepository>(TYPES.PostRepository)
	.toConstantValue(
		new MemoryFirstPostRepositoryImpl(
			container.getNamed<PostRepository>(TYPES.PostRepository, 'in-memory'),
			container.getNamed<PostRepository>(TYPES.PostRepository, 'remote')
		)
	)
	.whenTargetNamed('memory-first');

container
	.bind<PostService>(TYPES.PostService)
	.toConstantValue(
		new PostServiceImpl(container.getNamed<PostRepository>(TYPES.PostRepository, 'memory-first'))
	);

export default container;
