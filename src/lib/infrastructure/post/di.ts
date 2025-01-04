import { Container } from 'inversify';
import { TYPES } from './constants';
import { EventNotifier, type EventProvider } from '$lib/utils/notifier';

const container = new Container();

container.bind<EventProvider<PostRepositoryEvent>>(TYPES.EventProvider).to(EventNotifier);
container.bind<PostProvider>(TYPES.PostProvider).to(PostRepository).inSingletonScope();
container
	.bind<NotifiablePostProvider>(TYPES.NotifiablePostProvider)
	.to(NotifiablePostRepository)
	.inSingletonScope();

export { container as postContainer };
