import { UserDto } from "../../dto/UserDto";
import { FollowServiceRequest } from "./FollowServiceRequest";

export interface GetIsFollowerStatusRequest extends FollowServiceRequest {
  readonly selectedUser: UserDto | null;
}
