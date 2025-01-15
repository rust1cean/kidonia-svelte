import type { DetailedPostDto } from '@/domain/post';
import type { GetPostsPayload } from '../payload';
import type { PostService } from '../post-service';
import type { FetchRange } from '@/domain/common/repository';

export class GetPostsUseCase {
	constructor(private service: PostService) {}

	public async execute(range: FetchRange, payload: GetPostsPayload): Promise<DetailedPostDto[]> {
		return this.service.getPosts(range, payload);
	}
}
