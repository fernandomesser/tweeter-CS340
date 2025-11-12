import { StatusDto } from "../../dto/StatusDto";
import { UserDto } from "../../dto/UserDto";
import { TweeterResponse } from "./TweeterResponse";

export interface PagedItemResponse<T> extends TweeterResponse {
    readonly items: T[] | null;
    readonly hasMore: boolean;
}

export type PagedUserItemResponse = PagedItemResponse<UserDto>;
export type PagedStatusItemResponse = PagedItemResponse<StatusDto>;