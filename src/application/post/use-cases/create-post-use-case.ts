import type { CreatePostPayload } from '../payload';
import type { PostService } from '../post-service';

export class CreatePostUseCase {
	constructor(private service: PostService) {}

	public async execute(payload: CreatePostPayload): Promise<void> {
		return this.service.createPost(payload, 'published');
	}
}
