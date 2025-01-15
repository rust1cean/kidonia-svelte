import type { PostId } from '@/domain/common';
import type { EditPostPayload } from '../post-payload';
import type { PostService } from '../post-service';

export class EditPostUseCase {
	constructor(private service: PostService) {}

	public async execute(postId: PostId, payload: EditPostPayload): Promise<void> {
		return this.service.editPost(postId, payload, 'published');
	}
}
