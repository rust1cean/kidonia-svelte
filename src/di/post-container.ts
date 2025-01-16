import { Container } from 'inversify';
import { PostRepositoryImpl, RemotePostDatasource, type PostDatasource } from '@/data/post';
import {
	CreateDraftUseCase,
	CreatePostUseCase,
	DeletePostUseCase,
	EditDraftUseCase,
	EditPostUseCase,
	GetAuthorDraftsUseCase,
	GetAuthorPostsUseCase,
	GetPostsUseCase,
	type PostRepository,
	type PostService,
	PostServiceImpl
} from '@/application/post';
import { LocalPostDatasource } from '@/data/post/sources/local-post-datasource';

export const TYPES = {
	PostDatasource: Symbol.for('PostDatasource'),
	PostRepository: Symbol.for('PostRepository'),
	PostService: Symbol.for('PostService'),
	CreateDraftUseCase: Symbol.for('CreateDraftUseCase'),
	CreatePostUseCase: Symbol.for('CreatePostUseCase'),
	DeletePostUseCase: Symbol.for('DeletePostUseCase'),
	EditDraftUseCase: Symbol.for('EditDraftUseCase'),
	EditPostUseCase: Symbol.for('EditPostUseCase'),
	GetAuthorDraftsUseCase: Symbol.for('GetAuthorDraftsUseCase'),
	GetAuthorPostsUseCase: Symbol.for('GetAuthorPostsUseCase'),
	GetPostsUseCase: Symbol.for('GetPostsUseCase')
};

const container = new Container();

// Datasources
container.bind<PostDatasource>(TYPES.PostDatasource).to(LocalPostDatasource).whenTargetNamed("local")
container.bind<PostDatasource>(TYPES.PostDatasource).to(RemotePostDatasource).whenTargetNamed("remote")

// Repositories
container.bind<PostRepository>(TYPES.PostRepository).toDynamicValue(() => {
	const local = container.getNamed<PostDatasource>(TYPES.PostDatasource, 'local')
	const remote = container.getNamed<PostDatasource>(TYPES.PostDatasource, 'remote')

	return new PostRepositoryImpl(local, remote)
});

// Services
container
	.bind<PostService>(TYPES.PostService)
	.toConstantValue(
		new PostServiceImpl(container.get<PostRepository>(TYPES.PostRepository))
	);

// Use-cases
container
	.bind<CreateDraftUseCase>(TYPES.CreateDraftUseCase)
	.toDynamicValue(() => new CreateDraftUseCase(container.get<PostService>(TYPES.PostService)));
container
	.bind<CreatePostUseCase>(TYPES.CreatePostUseCase)
	.toDynamicValue(() => new CreatePostUseCase(container.get<PostService>(TYPES.PostService)));
container
	.bind<DeletePostUseCase>(TYPES.DeletePostUseCase)
	.toDynamicValue(() => new DeletePostUseCase(container.get<PostService>(TYPES.PostService)));
container
	.bind<EditDraftUseCase>(TYPES.EditDraftUseCase)
	.toDynamicValue(() => new EditDraftUseCase(container.get<PostService>(TYPES.PostService)));
container
	.bind<EditPostUseCase>(TYPES.EditPostUseCase)
	.toDynamicValue(() => new EditPostUseCase(container.get<PostService>(TYPES.PostService)));
container
	.bind<GetAuthorDraftsUseCase>(TYPES.GetAuthorDraftsUseCase)
	.toDynamicValue(() => new GetAuthorDraftsUseCase(container.get<PostService>(TYPES.PostService)));
container
	.bind<GetAuthorPostsUseCase>(TYPES.GetAuthorPostsUseCase)
	.toDynamicValue(() => new GetAuthorPostsUseCase(container.get<PostService>(TYPES.PostService)));
container
	.bind<GetPostsUseCase>(TYPES.GetPostsUseCase)
	.toDynamicValue(() => new GetPostsUseCase(container.get<PostService>(TYPES.PostService)));

export { container as postContainer };
