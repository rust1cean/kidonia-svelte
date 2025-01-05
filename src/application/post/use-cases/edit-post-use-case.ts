import type { PostId } from '@/domain/common/repository';
import type { EditPostPayload } from '../payload';
import type { PostService } from '../service';

export class EditPostUseCase {
	constructor(private service: PostService) {}

	public async execute(postId: PostId, payload: EditPostPayload): Promise<void> {
		return this.service.editPost(postId, payload, 'published');
	}
}
