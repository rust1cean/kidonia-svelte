import type {
	CreatePostData,
	FetchPostsOptions,
	PostRepository,
	UpdatePostData
} from '@/application/post';
import type { PostId } from '@/domain/common';
import type { DetailedPostDto } from '@/domain/post';
import { LocalPostDatasource } from './sources/local-post-datasource';
import { RemotePostDatasource } from './sources/remote-post-datasource';

export class PostRepositoryImpl implements PostRepository {
	constructor(
		private local = new LocalPostDatasource(),
		private remote = new RemotePostDatasource()
	) {}

	public async fetchPosts(options: FetchPostsOptions): Promise<DetailedPostDto[]> {
		let posts = await this.local.fetchPosts(options);

		if (posts.length === 0) {
			posts = await this.remote.fetchPosts(options);
			this.local.insertPosts(...posts)
		}

		return posts;
	}

	public async fetchPostById(postId: PostId): Promise<DetailedPostDto | null> {
		let post = await this.local.fetchPostById(postId);

		if (!post) {
			post = await this.remote.fetchPostById(postId);
		}

		return post;
	}

	public async createPost(postData: CreatePostData): Promise<void> {
		this.local.createPost(postData);
		this.remote.createPost(postData);
	}

	public async updatePost(postId: PostId, postData: UpdatePostData): Promise<void> {
		this.local.updatePost(postId, postData);
		this.remote.updatePost(postId, postData);
	}

	public async deletePost(postId: PostId): Promise<void> {
		this.local.deletePost(postId);
		this.remote.deletePost(postId);
	}
}
