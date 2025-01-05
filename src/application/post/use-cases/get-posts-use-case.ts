import type { DetailedPostDto } from '@/domain/post';
import type { GetPostsPayload } from '../payload';
import type { PostService } from '../service';

export class GetPostsUseCase {
	constructor(private service: PostService) {}

	public async execute(payload: GetPostsPayload): Promise<DetailedPostDto[]> {
		return this.service.getPosts(payload);
	}
}
