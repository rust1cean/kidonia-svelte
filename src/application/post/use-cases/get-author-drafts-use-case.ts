import type { DetailedPostDto } from '@/domain/post';
import type { GetAuthorPostsPayload } from '../payload';
import type { PostService } from '../post-service';

export class GetAuthorDraftsUseCase {
	constructor(private service: PostService) {}

	public async execute(payload: GetAuthorPostsPayload): Promise<DetailedPostDto[]> {
		return this.service.getAuthorPosts(payload, 'draft');
	}
}
