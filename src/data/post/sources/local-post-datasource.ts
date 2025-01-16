import { injectable } from 'inversify';
import type { CreatePostData, FetchPostsOptions, UpdatePostData } from '@/application/post';
import type { PostId } from '@/domain/common';
import type { DetailedPostDto } from '@/domain/post';
import type { PostDatasource } from './post-datasource';

@injectable()
export class LocalPostDatasource implements PostDatasource {
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

	public async createPost(post: CreatePostData): Promise<DetailedPostDto> {
		const date = new Date();
		const id = Number(date).toString();
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
