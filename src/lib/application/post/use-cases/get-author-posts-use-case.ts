import type { FetchRange, PostId } from '$lib/domain/common/repository';
import type { PostEntity } from '$lib/domain/post';
import type { Identify } from '$lib/utils/types';
import type { PostRepository } from '../repository';

export class GetAuthorPostsUseCase {
	constructor(private repository: PostRepository) {}

	public async execute({ offset, limit, authorId }: GetAuthorPostsRequest): Promise<PostEntity[]> {
		return this.repository.fetchPosts({
			draft: false,
			offset,
			limit,
			authorId
		});
	}
}

