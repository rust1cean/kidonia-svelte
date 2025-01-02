import 'reflect-metadata';
import { Container } from 'inversify';
import { type PostProvider, NotifiablePostStore, PostStore } from './post-store';
import { POST_DEPENDENCY_ID } from './post-constants';

const container = new Container();

container.bind<PostProvider>(POST_DEPENDENCY_ID.PostProvider).to(PostStore).inSingletonScope();
container
	.bind<PostProvider>(POST_DEPENDENCY_ID.PostProvider)
	.to(NotifiablePostStore)
	.inSingletonScope();

export default container;
