import { Container } from 'inversify';
import {
	type NotifiablePostProvider,
	type PostProvider,
	type PostRepositoryEvent,
	NotifiablePostRepository,
	PostRepository
} from './cache-post-repository';
import { POST_TYPES } from './constants';
import { EventNotifier, type EventProvider } from '$lib/utils/notifier';

const container = new Container();

container.bind<EventProvider<PostRepositoryEvent>>(POST_TYPES.EventProvider).to(EventNotifier);
container.bind<PostProvider>(POST_TYPES.PostProvider).to(PostRepository).inSingletonScope();
container
	.bind<NotifiablePostProvider>(POST_TYPES.NotifiablePostProvider)
	.to(NotifiablePostRepository)
	.inSingletonScope();

export { container as postContainer };
