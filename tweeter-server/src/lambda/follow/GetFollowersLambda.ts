import {
  PagedUserItemRequest,
  PagedUserItemResponse,
  UserDto,
} from "tweeter-shared";
import { createPagedHandler } from "../createPagedHandler";
import { FollowService } from "../../model/service/FollowService";

const followService = new FollowService();

export const handler = createPagedHandler<
  UserDto,
  PagedUserItemRequest,
  PagedUserItemResponse
>((token, userAlias, pageSize, lastItem) =>
  followService.loadMoreFollowers(token, userAlias, pageSize, lastItem)
);
