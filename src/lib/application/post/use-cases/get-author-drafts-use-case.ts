import type { FetchRange, PostId } from '$lib/domain/common/repository';
import type { PostEntity } from '$lib/domain/post';
import type { Identify } from '$lib/utils/types';
import type { PostRepository } from '../repository';

export class GetAuthorDraftsUseCase {
	constructor(private repository: PostRepository) {}

	public async execute({ offset, limit, authorId }: GetAuthorDraftsRequest): Promise<PostEntity[]> {
		return this.repository.fetchPosts({
			draft: true,
			offset,
			limit,
			authorId
		});
	}
}

export type GetAuthorDraftsRequest = Identify<FetchRange & { authorId: PostId }>;
