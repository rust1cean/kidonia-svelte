import type { PostRepository } from "./repository";

export class PostService {
  constructor(private repository: PostRepository) {}
}