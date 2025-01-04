import { Container } from 'inversify';
import { TYPES } from './constants';
import { PostRepositoryImpl } from './post-repository-impl';
import type { PostRepository } from '$lib/domain/post';

const container = new Container();

container.bind<PostRepository>(TYPES.PostRepository).to(PostRepositoryImpl).inSingletonScope();

export { container as postContainer };
