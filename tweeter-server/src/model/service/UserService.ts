import { Buffer } from "buffer";
import { FakeData, UserDto } from "tweeter-shared";
import { Service } from "./Service";

export class UserService implements Service {
  public async getUser(token: string, alias: string): Promise<UserDto | null> {
    // TODO: Replace with the result of calling server
    return this.getFakeDataUser(alias);
  }

  public async login(
    alias: string,
    password: string
  ): Promise<[UserDto, string]> {
    // TODO: Replace with the result of calling the server
    const user = await this.getFakeDataFirstUser();

    if (user === null) {
      throw new Error("Invalid alias or password");
    }

    return [user, FakeData.instance.authToken.token];
  }

  public async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: string,
    imageFileExtension: string
  ): Promise<[UserDto, string]> {
    // Not neded now, but will be needed when you make the request to the server in milestone 3
    const imageStringBase64: string =
      Buffer.from(userImageBytes).toString("base64");

    // TODO: Replace with the result of calling the server
    const user = await this.getFakeDataFirstUser();

    if (user === null) {
      throw new Error("Invalid registration");
    }

    return [user, FakeData.instance.authToken.token];
  }

  public async logout(token: string): Promise<void> {
    // Pause so we can see the logging out message. Delete when the call to the server is implemented.
    await new Promise((res) => setTimeout(res, 1000));
  }

  private async getFakeDataUser(alias: string): Promise<UserDto | null> {
    const theuser = FakeData.instance.findUserByAlias(alias);
    if (!theuser) {
      return null;
    }
    return theuser.dto;
  }

  private async getFakeDataFirstUser(): Promise<UserDto | null> {
    const fakeUser = FakeData.instance.firstUser;
    if (!fakeUser) {
      return null;
    }
    return fakeUser.dto;
  }
}
