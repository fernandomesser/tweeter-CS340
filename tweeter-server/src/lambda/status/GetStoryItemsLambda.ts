import {
  PagedStatusItemRequest,
  PagedStatusItemResponse,
  StatusDto,
} from "tweeter-shared";
import { createPagedHandler } from "../createPagedHandler";
import { StatusService } from "../../model/service/StatusService";

const statusService = new StatusService();

export const handler = createPagedHandler<
  StatusDto,
  PagedStatusItemRequest,
  PagedStatusItemResponse
>((token, userAlias, pageSize, lastItem) =>
  statusService.loadMoreStoryItems(token, userAlias, pageSize, lastItem)
);
