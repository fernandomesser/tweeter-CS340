import { FollowService } from "../../model/service/FollowService";
import { FollowServiceRequest, NumberResponse } from "tweeter-shared";

export const handler = async (
  request: FollowServiceRequest
): Promise<NumberResponse> => {
  const followService = new FollowService();
  const numberCount = await followService.getFollowerCount(
    request.token,
    request.user
  );
  return {
    success: true,
    message: null,
    count: numberCount,
  };
};
