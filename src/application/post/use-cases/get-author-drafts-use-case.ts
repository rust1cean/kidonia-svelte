import type { PostEntity } from '$lib/domain/post';
import type { GetAuthorPostsPayload } from '../payload';
import type { PostService } from '../service';

export class GetAuthorDraftsUseCase {
	constructor(private service: PostService) {}

	public async execute(payload: GetAuthorPostsPayload): Promise<PostEntity[]> {
		return this.service.getAuthorPosts(payload, 'draft');
	}
}
