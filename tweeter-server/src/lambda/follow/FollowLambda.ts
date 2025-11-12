import { FollowService } from "../../model/service/FollowService";
import { FollowServiceRequest, FollowUnfollowResponse } from "tweeter-shared";

export const handler = async (
  request: FollowServiceRequest
): Promise<FollowUnfollowResponse> => {
  const followService = new FollowService();
  const [followerCount, followeeCount] = await followService.follow(
    request.token,
    request.user
  );
  return {
    success: true,
    message: null,
    followerCount: followerCount,
    followeeCount: followeeCount,
  };
};
