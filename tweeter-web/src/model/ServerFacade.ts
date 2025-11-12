import { ClientCommunicator } from "./ClientCommunicator";

import { User, Status, AuthToken } from "tweeter-shared";

import type {
  PagedUserItemRequest,
  PagedStatusItemRequest,
  GetIsFollowerStatusRequest,
  FollowServiceRequest,
  GetUserRequest,
  LoginRequest,
  RegisterRequest,
  PostStatusRequest,
  TweeterRequest,
  PagedUserItemResponse,
  PagedStatusItemResponse,
  GetIsFollowerStatusResponse,
  FollowUnfollowResponse,
  GetUserResponse,
  NumberResponse,
  TweeterResponse,
  UserResponse,
  UserDto,
  StatusDto,
} from "tweeter-shared";

export class ServerFacade {
  private SERVER_URL =
    "https://n050wc6jz1.execute-api.us-west-2.amazonaws.com/dev";
  private clientCommunicator = new ClientCommunicator(this.SERVER_URL);

  // tweeterGetFollowers
  public async getFollowers(
    req: PagedUserItemRequest
  ): Promise<[User[], boolean]> {
    const resp = await this.clientCommunicator.doPost<
      PagedUserItemRequest,
      PagedUserItemResponse
    >(req, "/follower/list");
    if (!resp.success)
      throw new Error(resp.message ?? "Failed to get followers");

    const items =
      resp.items?.map((dto) => User.fromDto(dto as UserDto) as User) ?? [];
    if (items.length === 0) throw new Error("No followers found");
    return [items, !!resp.hasMore];
  }

  // tweeterGetFollowees
  public async getFollowees(
    req: PagedUserItemRequest
  ): Promise<[User[], boolean]> {
    const resp = await this.clientCommunicator.doPost<
      PagedUserItemRequest,
      PagedUserItemResponse
    >(req, "/followee/list");
    if (!resp.success)
      throw new Error(resp.message ?? "Failed to get followees");

    const items =
      resp.items?.map((dto) => User.fromDto(dto as UserDto) as User) ?? [];
    if (items.length === 0) throw new Error("No followees found");
    return [items, !!resp.hasMore];
  }

  // tweeterGetFollowerCount
  public async getFollowerCount(req: FollowServiceRequest): Promise<number> {
    const resp = await this.clientCommunicator.doPost<
      FollowServiceRequest,
      NumberResponse
    >(req, "/follower/getCount");
    if (resp.success && typeof resp.count === "number") return resp.count;
    throw new Error(resp.message ?? "Failed to get follower count");
  }

  // tweeterGetFolloweeCount
  public async getFolloweeCount(req: FollowServiceRequest): Promise<number> {
    const resp = await this.clientCommunicator.doPost<
      FollowServiceRequest,
      NumberResponse
    >(req, "/followee/getCount");
    if (resp.success && typeof resp.count === "number") return resp.count;
    throw new Error(resp.message ?? "Failed to get followee count");
  }

  // tweeterGetIsFollowerStatus
  public async getIsFollowerStatus(
    req: GetIsFollowerStatusRequest
  ): Promise<boolean> {
    const resp = await this.clientCommunicator.doPost<
      GetIsFollowerStatusRequest,
      GetIsFollowerStatusResponse
    >(req, "/follower/getStatus");
    if (resp.success && typeof resp.isFollower === "boolean")
      return resp.isFollower;
    throw new Error(resp.message ?? "Failed to get follower status");
  }

  // tweeterFollow
  public async follow(
    request: FollowServiceRequest
  ): Promise<[followerCount: number, followeeCount: number]> {
    const response = await this.clientCommunicator.doPost<
      FollowServiceRequest,
      FollowUnfollowResponse
    >(request, "/userAction/follow");

    if (response.followerCount == null || response.followeeCount == null) {
      console.error(response);
      throw new Error(
        response.message ?? "An unknown error occered in follow facade."
      );
    }
    return [response.followerCount, response.followeeCount];
  }

  // tweeterUnfollow
  public async unfollow(
    request: FollowServiceRequest
  ): Promise<[followerCount: number, followeeCount: number]> {
    const response = await this.clientCommunicator.doPost<
      FollowServiceRequest,
      FollowUnfollowResponse
    >(request, "/userAction/unfollow");

    if (response.followerCount == null || response.followeeCount == null) {
      console.error(response);
      throw new Error(
        response.message ?? "An unknown error occered in unfollow facade."
      );
    }
    return [response.followerCount, response.followeeCount];
  }

  // tweeterPostStatus
  public async postStatus(req: PostStatusRequest): Promise<void> {
    const resp = await this.clientCommunicator.doPost<
      PostStatusRequest,
      TweeterResponse
    >(req, "/status/post");
    if (!resp.success) throw new Error(resp.message ?? "Post status failed");
  }

  // tweeterGetFeedItems
  public async getFeedItems(
    req: PagedStatusItemRequest
  ): Promise<[Status[], boolean]> {
    const resp = await this.clientCommunicator.doPost<
      PagedStatusItemRequest,
      PagedStatusItemResponse
    >(req, "/status/getFeedItems");
    if (!resp.success) throw new Error(resp.message ?? "Failed to get feed");

    const items =
      resp.items?.map((dto) => Status.fromDto(dto as StatusDto) as Status) ??
      [];
    if (items.length === 0) throw new Error("No feed items found");
    return [items, !!resp.hasMore];
  }

  // tweeterGetStoryItems
  public async getStoryItems(
    req: PagedStatusItemRequest
  ): Promise<[Status[], boolean]> {
    const resp = await this.clientCommunicator.doPost<
      PagedStatusItemRequest,
      PagedStatusItemResponse
    >(req, "/status/getStoryItems");
    if (!resp.success) throw new Error(resp.message ?? "Failed to get story");

    const items =
      resp.items?.map((dto) => Status.fromDto(dto as StatusDto) as Status) ??
      [];
    if (items.length === 0) throw new Error("No story items found");
    return [items, !!resp.hasMore];
  }

  // tweeterRegister
  public async register(request: RegisterRequest): Promise<[User, AuthToken]> {
    const response = await this.clientCommunicator.doPost<
      RegisterRequest,
      UserResponse
    >(request, "/userAction/register");

    const user = User.fromDto(response.userDto);

    if (user == null || response.token == null) {
      console.error(response);
      throw new Error(
        response.message ?? "An unknown error occered in register facade."
      );
    }

    return [user, new AuthToken(response.token, 0)];
  }

  // tweeterLogin
  public async login(request: LoginRequest): Promise<[User, AuthToken]> {
    const response = await this.clientCommunicator.doPost<
      LoginRequest,
      UserResponse
    >(request, "/userAction/login");

    const user = User.fromDto(response.userDto);
    if (user == null || response.token == null) {
      console.error(response);
      throw new Error(
        response.message ?? "An unknown error occered in login facade."
      );
    }
    return [user, new AuthToken(response.token, 0)];
  }

  // tweeterLogout
  public async logout(req: TweeterRequest): Promise<void> {
    const resp = await this.clientCommunicator.doPost<
      TweeterRequest,
      TweeterResponse
    >(req, "/userAction/logout");
    if (!resp.success) throw new Error(resp.message ?? "Logout failed");
  }

  // tweeterGetUser
  public async getUser(request: GetUserRequest): Promise<User | null> {
    const response = await this.clientCommunicator.doPost<
      GetUserRequest,
      GetUserResponse
    >(request, "/userAction/getUser");

    if (!response.success) {
      console.error(response);
      throw new Error(
        response.message ?? "An unknown error occered in getUser facade."
      );
    }

    return User.fromDto(response.userDto);
  }
}
