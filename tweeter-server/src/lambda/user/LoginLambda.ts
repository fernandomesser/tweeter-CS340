import { LoginRequest, UserResponse } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";


export const handler = async (request: LoginRequest): Promise<UserResponse> => {
    const userService = new UserService();
    const [userDto, token] = await userService.login(request.alias, request.password);
    return {
        success: true,
        message: null,
        token: token,
        userDto: userDto
    }
}