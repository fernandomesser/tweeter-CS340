import { LogoutRequest } from "tweeter-shared";
import { TweeterResponse } from "tweeter-shared/dist/model/net/response/TweeterResponse";
import { UserService } from "../../model/service/UserService";

export const handler = async (request: LogoutRequest): Promise<TweeterResponse> => {
    const userService = new UserService();
    await userService.logout(request.token)
    return {
        success: true,
        message: null
    }
}