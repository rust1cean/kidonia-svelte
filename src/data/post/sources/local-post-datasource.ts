import type { CreatePostData, FetchPostsOptions, UpdatePostData } from '@/application/post';
import type { PostId } from '@/domain/common';
import type { DetailedPostDto } from '@/domain/post';
import type { PostDatasource } from './interfaces';

export class LocalPostDatasource implements PostDatasource {
	constructor(private source: { [key: PostId]: DetailedPostDto } = {}) {}

	public get allPosts(): Array<DetailedPostDto> {
		return Object.values(this.source);
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
				const minAgeBounds = post.minAge == null || minAge == null || post.minAge >= minAge;
				const maxAgeBounds = post.maxAge == null || maxAge == null || post.maxAge <= maxAge;

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

	public async createPost(post: CreatePostData): Promise<DetailedPostDto> {
		const date = new Date();
		const id = String(Math.random() * 100_000);
		const entity = {
			...post,
			id,
			updatedAt: date.toString()
		};

		this.source[id] = entity;

		return entity;
	}

	public async createManyPosts(...posts: CreatePostData[]): Promise<DetailedPostDto[]> {
		const entities = [];

		for (const post of posts) {
			const entity = await this.createPost(post);
			entities.push(entity);
		}

		return entities;
	}

	public async updatePost(postId: PostId, post: UpdatePostData): Promise<DetailedPostDto> {
		const entity = {
			...this.source[postId],
			...post,
			id: postId,
			updatedAt: new Date().toString()
		};
		this.source[postId] = entity;

		return entity;
	}

	public async deletePost(postId: PostId): Promise<void> {
		delete this.source[postId];
	}
}
