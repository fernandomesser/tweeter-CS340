import {
  AuthToken,
  Status,
  PagedStatusItemRequest,
  PostStatusRequest,
} from "tweeter-shared";
import { Service } from "./Service";
import { ServerFacade } from "../ServerFacade";

export class StatusService implements Service {
  private serverFacade: ServerFacade;

  constructor() {
    this.serverFacade = new ServerFacade();
  }

  public async loadMoreFeedItems(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]> {
    const request: PagedStatusItemRequest = {
      token: authToken.token,
      userAlias: userAlias,
      pageSize: pageSize,
      lastItem: lastItem ? lastItem.dto : null,
    };
    try {
      return await this.serverFacade.getFeedItems(request);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async loadMoreStoryItems(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]> {
    const request: PagedStatusItemRequest = {
      token: authToken.token,
      userAlias: userAlias,
      pageSize: pageSize,
      lastItem: lastItem ? lastItem.dto : null,
    };
    try {
      return await this.serverFacade.getStoryItems(request);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async postStatus(
    authToken: AuthToken,
    newStatus: Status
  ): Promise<void> {
    const request: PostStatusRequest = {
      token: authToken.token,
      status: newStatus,
    };
    try {
      return await this.serverFacade.postStatus(request);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
