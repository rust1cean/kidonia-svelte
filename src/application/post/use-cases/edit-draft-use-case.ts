import type { PostId } from '@/domain/common/repository';
import type { EditPostPayload } from '../payload';
import type { PostService } from '../post-service';

export class EditDraftUseCase {
	constructor(private service: PostService) {}

	public async execute(postId: PostId, payload: EditPostPayload): Promise<void> {
		return this.service.editPost(postId, payload, 'draft');
	}
}
