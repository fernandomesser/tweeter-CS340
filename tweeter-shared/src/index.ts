// All classes that should be avaialble to other modules need to exported here. export * does not work when
// uploading to lambda. Instead we have to list each export.

//Domain classes
export { Follow } from "./model/domain/Follow";
export { PostSegment, Type } from "./model/domain/PostSegment";
export { Status } from "./model/domain/Status";
export { User } from "./model/domain/User";
export { AuthToken } from "./model/domain/AuthToken";

//DTOs
export type { UserDto } from "./model/dto/UserDto";
export type { StatusDto } from "./model/dto/StatusDto";

//Requests
export type { TweeterRequest } from "./model/net/request/TweeterRequest";
export type {
  PagedUserItemRequest,
  PagedStatusItemRequest,
} from "./model/net/request/PagedItemRequest";
export type { GetIsFollowerStatusRequest } from "./model/net/request/GetIsFollowerStatusRequest";
export type { FollowServiceRequest } from "./model/net/request/FollowServiceRequest";
export type { GetUserRequest } from "./model/net/request/GetUserRequest";
export type { LoginRequest } from "./model/net/request/LoginRequest";
export type { RegisterRequest } from "./model/net/request/RegisterRequest";
export type { PostStatusRequest } from "./model/net/request/PostStatusRequest";
export type { LogoutRequest } from "./model/net/request/LogoutRequest";

//Response
export type { TweeterResponse } from "./model/net/response/TweeterResponse";
export type {
  PagedUserItemResponse,
  PagedStatusItemResponse,
} from "./model/net/response/PagedItemResponse";
export type { GetIsFollowerStatusResponse } from "./model/net/response/GetIsFollowerStatusResponse";
export type { NumberResponse } from "./model/net/response/NumberResponse";
export type { FollowUnfollowResponse } from "./model/net/response/FollowUnfollowResponse";
export type { GetUserResponse } from "./model/net/response/GetUserResponse";
export type { UserResponse } from "./model/net/response/UserResponse";

//Other
export { FakeData } from "./util/FakeData";
