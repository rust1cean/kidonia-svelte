import type { DetailedPostEntity } from '@/domain/post';
import type { GetAuthorPostsPayload } from '../payload';
import type { PostService } from '../service';

export class GetAuthorPostsUseCase {
	constructor(private service: PostService) {}

	public async execute(payload: GetAuthorPostsPayload): Promise<DetailedPostEntity[]> {
		return this.service.getAuthorPosts(payload, 'published');
	}
}
