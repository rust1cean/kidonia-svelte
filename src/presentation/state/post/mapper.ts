import type { DetailedPostDto } from "@/domain/post";
import type { PostVModel } from "./model";

export const detailedPostDtoToPostVModel = (dto: DetailedPostDto): PostVModel => ({
  ...dto,
  updatedAt: new Date(Number(dto.updatedAt))
})