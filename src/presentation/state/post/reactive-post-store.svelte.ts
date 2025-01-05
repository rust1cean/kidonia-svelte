import type { PostVModel } from './model';
import { postContainer, TYPES } from '@/di/post-container';
import type { GetPostsPayload, GetPostsUseCase } from '@/application/post';
import { detailedPostDtoToPostVModel } from './mapper';
import { ReactiveLimitedArray } from '@/presentation/shared/reactive-collections';

export const REACTIVE_POST_STORE_SIZE_LIMIT: number = 64;

export class ReactivePostStore extends ReactiveLimitedArray<PostVModel> {
	protected items = $state(new Array(REACTIVE_POST_STORE_SIZE_LIMIT));

	constructor(
		private getPosts: GetPostsUseCase = postContainer.get<GetPostsUseCase>(TYPES.GetPostsUseCase)
	) {
		super(REACTIVE_POST_STORE_SIZE_LIMIT);
	}

	public get allPosts(): PostVModel[] {
		return Object.values(this.items);
	}

	public async requestPosts(options: GetPostsPayload): Promise<PostVModel[]> {
		const postEntities = await this.getPosts.execute(options);
		const postModels = postEntities.map(detailedPostDtoToPostVModel);

		this.write(...postModels);

		return postModels;
	}
}

export const reactivePostStore = new ReactivePostStore();
