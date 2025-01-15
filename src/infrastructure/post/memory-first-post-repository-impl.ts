import type {
	CreatePostData,
	FetchPostsOptions,
	PostRepository,
	UpdatePostData
} from '@/application/post';
import type { PostId } from '@/domain/common';
import type { DetailedPostDto } from '@/domain/post';

export class MemoryFirstPostRepositoryImpl implements PostRepository {
	constructor(
		private inMemoryRepository: PostRepository,
		private remoteRepository: PostRepository
	) {}

	public async fetchPosts(options: FetchPostsOptions): Promise<DetailedPostDto[]> {
		let posts = await this.inMemoryRepository.fetchPosts(options);

		if (posts.length === 0) {
			posts = await this.remoteRepository.fetchPosts(options);
		}

		return posts;
	}

	public async fetchPostById(postId: PostId): Promise<DetailedPostDto | null> {
		let post = await this.inMemoryRepository.fetchPostById(postId);

		if (!post) {
			post = await this.remoteRepository.fetchPostById(postId);
		}

		return post;
	}

	public async createPost(postData: CreatePostData): Promise<void> {
		this.inMemoryRepository.createPost(postData);
		this.remoteRepository.createPost(postData);
	}

	public async updatePost(postId: PostId, postData: UpdatePostData): Promise<void> {
		this.inMemoryRepository.updatePost(postId, postData);
		this.remoteRepository.updatePost(postId, postData);
	}

	public async deletePost(postId: PostId): Promise<void> {
		this.inMemoryRepository.deletePost(postId);
		this.remoteRepository.deletePost(postId);
	}
}
