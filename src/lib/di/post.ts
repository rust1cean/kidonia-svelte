import { Container } from 'inversify';
import { postContainer } from '$lib/infrastructure/post';
import { type PostService, PostServiceImpl } from '$lib/application/post';

export const TYPES = {
	PostService: Symbol.for('PostService')
};

const container = new Container();

Container.merge(container, postContainer);
container.bind<PostService>(TYPES.PostService).to(PostServiceImpl);

export { container as postContainer };
