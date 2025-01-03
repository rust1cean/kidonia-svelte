import 'reflect-metadata';
import { Container, type interfaces } from 'inversify';
import { NOTIFIER_DEPENDENCY_ID } from './constants';
import type { OneEventProvider } from './interfaces';
import { OneEventNotifier } from './one-event-notifier';

const container = new Container();

container.bind<OneEventProvider>(NOTIFIER_DEPENDENCY_ID.OneEventProvider).to(OneEventNotifier);
container
	.bind<interfaces.Factory<OneEventProvider>>(NOTIFIER_DEPENDENCY_ID.OneEventProviderFactory)
	.toFactory<OneEventProvider>((context: interfaces.Context) => {
		return () => {
			return context.container.get<OneEventProvider>(NOTIFIER_DEPENDENCY_ID.OneEventProvider);
		};
	});

export default container;
