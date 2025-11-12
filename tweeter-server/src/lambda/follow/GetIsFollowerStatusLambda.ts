import { FollowService } from "../../model/service/FollowService";
import {
  GetIsFollowerStatusRequest,
  GetIsFollowerStatusResponse,
} from "tweeter-shared";

export const handler = async (
  request: GetIsFollowerStatusRequest
): Promise<GetIsFollowerStatusResponse> => {
  const followService = new FollowService();
  const isFollower = await followService.getIsFollowerStatus(
    request.token,
    request.user,
    request.selectedUser
  );
  return {
    success: true,
    message: null,
    isFollower: isFollower,
  };
};
