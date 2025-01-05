import { Container } from 'inversify';
import {
	InMemoryPostRepository,
	MemoryFirstPostRepositoryImpl,
	RemotePostRepositoryImpl
} from '$lib/infrastructure/post';
import {
	CreateDraftUseCase,
	CreatePostUseCase,
	DeletePostUseCase,
	EditDraftUseCase,
	EditPostUseCase,
	GetAuthorDraftsUseCase,
	GetAuthorPostsUseCase,
	SearchPostsUseCase,
	type PostRepository,
	type PostService,
	PostServiceImpl
} from '$lib/application/post';

export const TYPES = {
	PostRepository: Symbol.for('PostRepository'),
	PostService: Symbol.for('PostService'),
	CreateDraftUseCase: Symbol.for('CreateDraftUseCase'),
	CreatePostUseCase: Symbol.for('CreatePostUseCase'),
	DeletePostUseCase: Symbol.for('DeletePostUseCase'),
	EditDraftUseCase: Symbol.for('EditDraftUseCase'),
	EditPostUseCase: Symbol.for('EditPostUseCase'),
	GetAuthorDraftsUseCase: Symbol.for('GetAuthorDraftsUseCase'),
	GetAuthorPostsUseCase: Symbol.for('GetAuthorPostsUseCase'),
	SearchPostsUseCase: Symbol.for('SearchPostsUseCase')
};

const container = new Container();

// Repositories
container
	.bind<PostRepository>(TYPES.PostRepository)
	.toConstantValue(new RemotePostRepositoryImpl())
	.whenTargetNamed('remote');
container
	.bind<PostRepository>(TYPES.PostRepository)
	.toConstantValue(new InMemoryPostRepository())
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

// Services
container
	.bind<PostService>(TYPES.PostService)
	.toConstantValue(
		new PostServiceImpl(container.getNamed<PostRepository>(TYPES.PostRepository, 'memory-first'))
	);

// Use-cases
container
	.bind<CreateDraftUseCase>(TYPES.CreateDraftUseCase)
	.toConstantValue(new CreateDraftUseCase(container.get<PostService>(TYPES.PostService)));
container
	.bind<CreatePostUseCase>(TYPES.CreatePostUseCase)
	.toConstantValue(new CreatePostUseCase(container.get<PostService>(TYPES.PostService)));
container
	.bind<DeletePostUseCase>(TYPES.DeletePostUseCase)
	.toConstantValue(new DeletePostUseCase(container.get<PostService>(TYPES.PostService)));
container
	.bind<EditDraftUseCase>(TYPES.EditDraftUseCase)
	.toConstantValue(new EditDraftUseCase(container.get<PostService>(TYPES.PostService)));
container
	.bind<EditPostUseCase>(TYPES.EditPostUseCase)
	.toConstantValue(new EditPostUseCase(container.get<PostService>(TYPES.PostService)));
container
	.bind<GetAuthorDraftsUseCase>(TYPES.GetAuthorDraftsUseCase)
	.toConstantValue(new GetAuthorDraftsUseCase(container.get<PostService>(TYPES.PostService)));
container
	.bind<GetAuthorPostsUseCase>(TYPES.GetAuthorPostsUseCase)
	.toConstantValue(new GetAuthorPostsUseCase(container.get<PostService>(TYPES.PostService)));
container
	.bind<SearchPostsUseCase>(TYPES.SearchPostsUseCase)
	.toConstantValue(new SearchPostsUseCase(container.get<PostService>(TYPES.PostService)));

export default container;
