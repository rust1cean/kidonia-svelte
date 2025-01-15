import type { PostId } from '@/domain/common/repository';
import type { PostService } from '../post-service';

export class DeletePostUseCase {
  constructor(private service: PostService) {}

  public async execute(postId: PostId): Promise<void> {
    return this.service.deletePost(postId);
  }
}
