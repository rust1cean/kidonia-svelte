import type { PostId } from '$lib/domain/common/repository';
import type { PostService } from '../service';

export class DeletePostUseCase {
  constructor(private service: PostService) {}

  public async execute(postId: PostId): Promise<void> {
    return this.service.deletePost(postId);
  }
}
