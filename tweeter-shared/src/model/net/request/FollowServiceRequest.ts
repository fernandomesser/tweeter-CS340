import { UserDto } from "../../dto/UserDto";
import { TweeterRequest } from "./TweeterRequest";

export interface FollowServiceRequest extends TweeterRequest {
  readonly token: string;
  readonly user: UserDto | null;
}
