import { injectable } from 'inversify';
import type { CreatePostData, FetchPostsOptions, UpdatePostData } from '@/application/post';
import type { PostId } from '@/domain/common';
import type { DetailedPostDto } from '@/domain/post';

@injectable()
export class LocalPostDatasource {
	constructor(private source: { [key: PostId]: DetailedPostDto } = {}) {}

	public get allPosts(): Array<DetailedPostDto> {
		return Object.values(this.source);
	}

	public insertPosts(...posts: DetailedPostDto[]) {
		const { source } = this;

		for (const post of posts) {
			source[post.id] = post;
		}
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
	}: FetchPostsOptions): Promise<Array<DetailedPostDto>> {
		const filteredPosts = this.allPosts
			.filter((post) => {
				const isDraft = draft == null || post.draft === draft;
				const zipcodeBounds = zipcode == null || post.zipcode === zipcode;
				const titleBounds = title == null || post.title.includes(title);
				const descriptionBounds = description == null || post.description.includes(description);
				const categoriesBounds = categories == null || post.category === categories[0];
				const addressBounds = address == null || post.address === address;
				const minAgeBounds = minAge == null || post.minAge >= minAge;
				const maxAgeBounds = maxAge == null || post.maxAge <= maxAge;

				return (
					isDraft ||
					zipcodeBounds ||
					titleBounds ||
					descriptionBounds ||
					categoriesBounds ||
					addressBounds ||
					minAgeBounds ||
					maxAgeBounds
				);
			})
			.slice(offset, offset + limit);

		return filteredPosts;
	}

	public async fetchPostById(postId: PostId): Promise<DetailedPostDto | null> {
		return this.source[postId];
	}

	public async createPost(post: CreatePostData): Promise<void> {
		const date = new Date();
		const id = Number(date).toString();

		this.source[id] = {
			...post,
			id,
			updatedAt: date.toString()
		};
	}

	public async updatePost(postId: PostId, post: UpdatePostData): Promise<void> {
		this.source[postId] = {
			...this.source[postId],
			...post,
			id: postId,
			updatedAt: new Date().toString()
		};
	}

	public async deletePost(postId: PostId): Promise<void> {
		delete this.source[postId];
	}
}
