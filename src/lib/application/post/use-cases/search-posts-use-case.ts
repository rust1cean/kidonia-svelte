import type { PostEntity } from '$lib/domain/post';
import type { SearchPostsPayload } from '../payload';
import type { PostService } from '../service';

export class SearchPostsUseCase {
	constructor(private service: PostService) {}

	public async execute(payload: SearchPostsPayload): Promise<PostEntity[]> {
		return this.service.searchPosts(payload);
	}
}
