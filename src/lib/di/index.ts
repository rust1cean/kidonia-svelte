import { Container } from 'inversify';
import { PostRepositoryImpl } from '$lib/infrastructure/post';
import { type PostRepository, type PostService, PostServiceImpl } from '$lib/application/post';

export const TYPES = {
	PostRepository: Symbol.for('PostRepository'),
	PostService: Symbol.for('PostService')
};

const container = new Container();

container.bind<PostRepository>(TYPES.PostRepository).to(PostRepositoryImpl).inSingletonScope();
container
	.bind<PostService>(TYPES.PostService)
	.toConstantValue(new PostServiceImpl(container.get<PostRepository>(TYPES.PostRepository)));

export default container;
