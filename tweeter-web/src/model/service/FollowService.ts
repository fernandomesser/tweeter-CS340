import {
  AuthToken,
  User,
  GetIsFollowerStatusRequest,
  FollowServiceRequest,
  PagedUserItemRequest,
} from "tweeter-shared";
import { Service } from "./Service";
import { ServerFacade } from "../ServerFacade";

export class FollowService implements Service {
  private serverFacade: ServerFacade;

  constructor() {
    this.serverFacade = new ServerFacade();
  }

  public async loadMoreFollowees(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: User | null
  ): Promise<[User[], boolean]> {
    const request: PagedUserItemRequest = {
      token: authToken.token,
      userAlias: userAlias,
      pageSize: pageSize,
      lastItem: lastItem ? lastItem.dto : null,
    };

    try {
      return await this.serverFacade.getFollowees(request);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async loadMoreFollowers(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: User | null
  ): Promise<[User[], boolean]> {
    const request: PagedUserItemRequest = {
      token: authToken.token,
      userAlias: userAlias,
      pageSize: pageSize,
      lastItem: lastItem ? lastItem.dto : null,
    };

    try {
      return await this.serverFacade.getFollowers(request);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getIsFollowerStatus(
    authToken: AuthToken,
    user: User,
    selectedUser: User
  ): Promise<boolean> {
    const request: GetIsFollowerStatusRequest = {
      token: authToken.token,
      user: user.dto,
      selectedUser: selectedUser.dto,
    };

    try {
      return await this.serverFacade.getIsFollowerStatus(request);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getFolloweeCount(
    authToken: AuthToken,
    user: User
  ): Promise<number> {
    const request: FollowServiceRequest = {
      token: authToken.token,
      user: user.dto,
    };

    try {
      return await this.serverFacade.getFolloweeCount(request);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getFollowerCount(
    authToken: AuthToken,
    user: User
  ): Promise<number> {
    const request: FollowServiceRequest = {
      token: authToken.token,
      user: user.dto,
    };

    try {
      return await this.serverFacade.getFollowerCount(request);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async follow(
    authToken: AuthToken,
    userToFollow: User
  ): Promise<[followerCount: number, followeeCount: number]> {
    // Pause so we can see the follow message. Remove when connected to the server
    //await new Promise((f) => setTimeout(f, 2000));
    const request: FollowServiceRequest = {
      token: authToken.token,
      user: userToFollow.dto,
    };

    try {
      return await this.serverFacade.follow(request);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async unfollow(
    authToken: AuthToken,
    userToFollow: User
  ): Promise<[followerCount: number, followeeCount: number]> {
    // Pause so we can see the unfollow message. Remove when connected to the server
    //await new Promise((f) => setTimeout(f, 2000));
    const request: FollowServiceRequest = {
      token: authToken.token,
      user: userToFollow.dto,
    };

    try {
      return await this.serverFacade.unfollow(request);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
