import type { CreatePostPayload } from '../payload';
import type { PostService } from '../service';

export class CreateDraftUseCase {
	constructor(private service: PostService) {}

	public async execute(payload: CreatePostPayload): Promise<void> {
		return this.service.createPost(payload, 'draft');
	}
}
