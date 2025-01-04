import type { Identify } from '$lib/utils/types';
import { type EventProvider } from '$lib/utils/notifier';

export type PostRepositoryRequestEvent = 'on-request' | 'on-request-reject' | 'on-request-response';
export type PostRepositoryUpdateEvent = 'on-drop';
export type PostRepositoryEvent = Identify<PostRepositoryRequestEvent | PostRepositoryUpdateEvent>;

export interface NotifiablePostProvider extends EventProvider<PostRepositoryEvent> {}
