import type { AuthorId } from '$lib/domain/common/repository';
import { MAX_AGE, MIN_AGE, type PostCategory } from '$lib/domain/post';
import type { PostRepository } from '../repository';

export class CreatePostUseCase {
	constructor(private repository: PostRepository) {}

	public async execute({
		title,
		authorId,
		zipcode,
		address,
		phone,
		description = '',
		imagePath = '',
		maxAge = MAX_AGE,
		minAge = MIN_AGE,
		price = null,
		category = null
	}: CreatePostPayload, isDraft: boolean): Promise<void> {
		return this.repository.createPost({
			draft: isDraft,
			title,
			authorId,
			zipcode,
			address,
			phone,
			category,
			description,
			imagePath,
			price,
			maxAge,
			minAge,
		});
	}
}
