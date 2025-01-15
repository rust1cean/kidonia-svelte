import { Container } from 'inversify';
import { PostRepositoryImpl } from '@/data/post';
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
	GetPostsUseCase: Symbol.for('GetPostsUseCase')
};

const container = new Container();

// Repositories
container.bind<PostRepository>(TYPES.PostRepository).to(PostRepositoryImpl);

// Services
container
	.bind<PostService>(TYPES.PostService)
	.toConstantValue(
		new PostServiceImpl(container.getNamed<PostRepository>(TYPES.PostRepository, 'memory-first'))
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
