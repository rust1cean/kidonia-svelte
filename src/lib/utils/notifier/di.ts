import { Container, type interfaces } from 'inversify';
import { NOTIFIER_TYPES } from './constants';
import type { OneEventProvider } from './interfaces';
import { OneEventNotifier } from './one-event-notifier';

const container = new Container();

container.bind<OneEventProvider>(NOTIFIER_TYPES.OneEventProvider).to(OneEventNotifier);
container
	.bind<interfaces.Factory<OneEventProvider>>(NOTIFIER_TYPES.OneEventProviderFactory)
	.toFactory<OneEventProvider>((context: interfaces.Context) => {
		return () => {
			return context.container.get<OneEventProvider>(NOTIFIER_TYPES.OneEventProvider);
		};
	});

export default container;
