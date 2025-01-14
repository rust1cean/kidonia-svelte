import type { DetailedPostDto } from '@/domain/post';
import type { GetAuthorPostsPayload } from '../payload';
import type { PostService } from '../service';
import type { FetchRange } from '@/domain/common/repository';

export class GetAuthorPostsUseCase {
	constructor(private service: PostService) {}

	public async execute(range: FetchRange, payload: GetAuthorPostsPayload): Promise<DetailedPostDto[]> {
		return this.service.getAuthorPosts(range, payload, 'published');
	}
}
