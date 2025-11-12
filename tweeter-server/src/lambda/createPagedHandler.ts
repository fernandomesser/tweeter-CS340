import { PagedItemRequest } from "tweeter-shared/dist/model/net/request/PagedItemRequest";
import { PagedItemResponse } from "tweeter-shared/dist/model/net/response/PagedItemResponse";

export const createPagedHandler = <
  Item,
  Request extends PagedItemRequest<Item | null>,
  Response extends PagedItemResponse<Item>
>(
  loadMoreFn: (
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: Item | null
  ) => Promise<[Item[], boolean]>
) => {
  return async (request: Request): Promise<Response> => {
    const [items, hasMore] = await loadMoreFn(
      request.token,
      request.userAlias,
      request.pageSize,
      request.lastItem ?? null
    );

    return {
      success: true,
      message: null,
      items,
      hasMore,
    } as Response;
  };
};
