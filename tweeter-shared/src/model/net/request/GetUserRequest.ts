import { UserRequest } from "./UserRequest";

export interface GetUserRequest extends UserRequest {
  readonly token: string;
}
