import { UserDto } from "../../dto/UserDto";
import { TweeterResponse } from "./TweeterResponse";

export interface UserResponse extends TweeterResponse {
    readonly token: string;
    readonly userDto: UserDto | null;
}