import { Buffer } from "buffer";
import {
  AuthToken,
  User,
  LoginRequest,
  RegisterRequest,
  LogoutRequest,
  GetUserRequest,
} from "tweeter-shared";
import { Service } from "./Service";
import { ServerFacade } from "../ServerFacade";

export class UserService implements Service {
  private serverFacade: ServerFacade;

  constructor() {
    this.serverFacade = new ServerFacade();
  }

  public async getUser(
    authToken: AuthToken,
    alias: string
  ): Promise<User | null> {
    const request: GetUserRequest = {
      token: authToken.token,
      alias: alias,
    };

    try {
      return await this.serverFacade.getUser(request);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async login(
    alias: string,
    password: string
  ): Promise<[User, AuthToken]> {
    const request: LoginRequest = {
      alias: alias,
      password: password,
    }
    try {
      return await this.serverFacade.login(request);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: Uint8Array,
    imageFileExtension: string
  ): Promise<[User, AuthToken]> {
    // Not neded now, but will be needed when you make the request to the server in milestone 3
    const imageStringBase64: string =
      Buffer.from(userImageBytes).toString("base64");

    const request: RegisterRequest = {
      firstName: firstName,
      lastName: lastName,
      alias: alias,
      password: password,
      userImageBytes: imageStringBase64,
      imageFileExtension: imageFileExtension,
    };

    try {
      return await this.serverFacade.register(request);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async logout(authToken: AuthToken): Promise<void> {
    // Pause so we can see the logging out message. Delete when the call to the server is implemented.
    //await new Promise((res) => setTimeout(res, 1000));
    const request: LogoutRequest = {
      token: authToken.token,
    };
    try {
      return await this.serverFacade.logout(request);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
