import type { CreatePostData, FetchPostsOptions, PostRepository, UpdatePostData } from '@/application/post';
import type { PostId } from '@/domain/common/repository';
import type { DetailedPostEntity } from '@/domain/post';

export class MemoryFirstPostRepositoryImpl implements PostRepository {
	constructor(
		private inMemoryRepository: PostRepository,
		private remoteRepository: PostRepository
	) {}

	public async fetchPosts(options: FetchPostsOptions): Promise<DetailedPostEntity[]> {
    let posts = await this.inMemoryRepository.fetchPosts(options);

    if (posts.length === 0) {
      posts = await this.remoteRepository.fetchPosts(options);
    }

    return posts;
  }

  public async fetchPostById(postId: PostId): Promise<DetailedPostEntity | null> {
    let post = await this.inMemoryRepository.fetchPostById(postId)

    if (!post) {
      post = await this.remoteRepository.fetchPostById(postId)
    }

    return post;
  }

  public async createPost(postData: CreatePostData): Promise<void> {
    this.inMemoryRepository.createPost(postData)
    this.remoteRepository.createPost(postData)
  }

  public async updatePost(postId: PostId, postData: UpdatePostData): Promise<void> {
    this.inMemoryRepository.updatePost(postId, postData)
    this.remoteRepository.updatePost(postId, postData)
  }

  public async deletePost(postId: PostId): Promise<void> {
    this.inMemoryRepository.deletePost(postId)
    this.remoteRepository.deletePost(postId)
  }
}
