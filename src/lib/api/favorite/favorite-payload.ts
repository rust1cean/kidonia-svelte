import type { Id } from "../types";

export type CreateFavoritePayload = {
  author_id: Id;
  post_id: Id;
};
