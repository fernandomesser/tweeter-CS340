import { StatusDto } from "../../dto/StatusDto";
import { UserDto } from "../../dto/UserDto";
import { TweeterRequest } from "./TweeterRequest";

export interface PagedItemRequest<T> extends TweeterRequest {
  readonly token: string;
  readonly userAlias: string;
  readonly pageSize: number;
  readonly lastItem: T | null;
}

export type PagedStatusItemRequest = PagedItemRequest<StatusDto>;
export type PagedUserItemRequest = PagedItemRequest<UserDto>;
