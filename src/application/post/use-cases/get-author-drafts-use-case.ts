import type { DetailedPostDto } from '@/domain/post';
import type { GetAuthorPostsPayload } from '../post-payload';
import type { PostService } from '../post-service';
import type { FetchRange } from '@/domain/common';

export class GetAuthorDraftsUseCase {
	constructor(private service: PostService) {}

	public async execute(range: FetchRange, payload: GetAuthorPostsPayload): Promise<DetailedPostDto[]> {
		return this.service.getAuthorPosts(range, payload, 'draft');
	}
}
