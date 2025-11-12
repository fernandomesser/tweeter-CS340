import { RegisterRequest, UserDto, UserResponse } from "tweeter-shared"
import { UserService } from "../../model/service/UserService"


export const handler = async (request: RegisterRequest):Promise<UserResponse> => {
    const userService = new UserService();
    const [userDto, token] = await userService.register(request.firstName, request.lastName, request.alias, request.password, request.userImageBytes, request.imageFileExtension);
    return {
        success: true,
        message: null,
        token: token,
        userDto: userDto
    }
}