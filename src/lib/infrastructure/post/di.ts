import { Container } from 'inversify';
import { PostRepositoryImpl } from './post-repository-impl';
import type { PostRepository } from '$lib/application/post';

export const TYPES =  {
  PostRepository: Symbol.for("PostRepository")
}

const container = new Container();

container.bind<PostRepository>(TYPES.PostRepository).to(PostRepositoryImpl).inSingletonScope();

export default container;
