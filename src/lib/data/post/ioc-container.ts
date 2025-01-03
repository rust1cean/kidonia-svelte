import 'reflect-metadata';
import { Container } from 'inversify';
import {
	type NotifiablePostProvider,
	type PostProvider,
	type PostStoreEvent,
	NotifiablePostStore,
	PostStore
} from './post-store';
import { POST_DEPENDENCY_ID } from './post-constants';
import { EventNotifier, type EventProvider } from '$lib/utils/notifier';

const container = new Container();

container
	.bind<EventProvider<PostStoreEvent>>(POST_DEPENDENCY_ID.EventProvider)
	.to(EventNotifier);

container.bind<PostProvider>(POST_DEPENDENCY_ID.PostProvider).to(PostStore).inSingletonScope();

container
	.bind<NotifiablePostProvider>(POST_DEPENDENCY_ID.NotifiablePostProvider)
	.to(NotifiablePostStore)
	.inSingletonScope();

export default container;
