import type { FetchRange } from "$lib/domain/common/repository";
import { MAX_AGE, MIN_AGE, type PostCategory, type PostEntity } from "$lib/domain/post";
import type { Identify } from "$lib/utils/types";
import type { PostRepository } from "../repository";

export class SearchPostsUseCase {
  constructor(private repository: PostRepository) {}

  public async execute({
      offset,
      limit,
      minAge = MIN_AGE,
      maxAge = MAX_AGE,
      categories = [],
      address,
      zipcode,
      query
    }: SearchPostsRequest): Promise<PostEntity[]> {
      return this.repository.fetchPosts({
        title: query,
        description: query,
        draft: false,
        offset,
        limit,
        minAge,
        maxAge,
        categories,
        address,
        zipcode
      });
    }
}