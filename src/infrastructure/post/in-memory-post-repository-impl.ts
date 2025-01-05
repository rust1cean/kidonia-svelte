import { injectable } from 'inversify';
import type {
	CreatePostData,
	FetchPostsOptions,
	PostRepository,
	UpdatePostData
} from '$lib/application/post';
import type { PostId } from '$lib/domain/common/repository';
import type { DetailedPostEntity } from '$lib/domain/post';
import { POSTS_PER_REQUEST_LIMIT } from '.';

@injectable()
export class InMemoryPostRepository implements PostRepository {
	constructor(private repository: { [key: PostId]: DetailedPostEntity } = {}) {}

	public get allPosts(): Array<DetailedPostEntity> {
		return Object.values(this.repository);
	}

	public async fetchPosts({
		offset,
		limit,
		minAge,
		maxAge,
		draft,
		zipcode,
		title,
		description,
		categories,
		address
	}: FetchPostsOptions): Promise<Array<DetailedPostEntity>> {
		const filteredPosts = this.allPosts
			.filter((post) => {
				const isDraft = draft == null || post.draft === draft;
				const zipcodeBounds = zipcode == null || post.zipcode === zipcode;
				const titleBounds = title == null || post.title.includes(title);
				const descriptionBounds = description == null || post.description.includes(description);
				const categoriesBounds = categories == null || post.category === categories[0];
				const addressBounds = address == null || post.address === address;
				const minAgeBounds = minAge == null || post.minAge === minAge;
				const maxAgeBounds = maxAge == null || post.maxAge === maxAge;

				return (
					isDraft &&
					zipcodeBounds &&
					titleBounds &&
					descriptionBounds &&
					categoriesBounds &&
					addressBounds &&
					minAgeBounds &&
					maxAgeBounds
				);
			})
			.slice(offset, limit > POSTS_PER_REQUEST_LIMIT ? POSTS_PER_REQUEST_LIMIT : limit);

		return filteredPosts;
	}

	public async fetchPostById(postId: PostId): Promise<DetailedPostEntity | null> {
		return this.repository[postId];
	}

	public async createPost(post: CreatePostData): Promise<void> {
		const date = new Date();
		const id = Number(date).toString();

		this.repository[id] = {
			...post,
			id,
			updatedAt: date.toString()
		};
	}

	public async updatePost(postId: PostId, post: UpdatePostData): Promise<void> {
		this.repository[postId] = {
			...this.repository[postId],
			...post,
			id: postId,
			updatedAt: new Date().toString()
		};
	}

	public async deletePost(postId: PostId): Promise<void> {
		delete this.repository[postId];
	}
}
