import type { CreatePostPayload } from '../post-payload';
import type { PostService } from '../post-service';

export class CreateDraftUseCase {
	constructor(private service: PostService) {}

	public async execute(payload: CreatePostPayload): Promise<void> {
		return this.service.createPost(payload, 'draft');
	}
}
