import type { DetailedPostEntity } from '@/domain/post';
import type { GetPostsPayload } from '../payload';
import type { PostService } from '../service';

export class GetPostsUseCase {
	constructor(private service: PostService) {}

	public async execute(payload: GetPostsPayload): Promise<DetailedPostEntity[]> {
		return this.service.getPosts(payload);
	}
}
