import { User, AuthToken } from "tweeter-shared";
import { UserService } from "../model.service/UserService";

export interface LoginView {
  setIsLoading(value: boolean): void;
  navigate(url: string): void;
  displayErrorMessage(message: string): string;
  updateUserInfo(
    currentUser: User,
    displayedUser: User,
    authToken: AuthToken,
    rememberMe: boolean
  ): void;
}

export class LoginPresenter {
  private userService: UserService;
  private view: LoginView;

  public constructor(view: LoginView) {
    this.userService = new UserService();
    this.view = view;
  }

  public async doLogin(
    alias: string,
    password: string,
    rememberMe: boolean,
    originalUrl?: string
  ) {
    try {
      this.view.setIsLoading(true);

      const [user, authToken] = await this.userService.login(alias, password);

      this.view.updateUserInfo(user, user, authToken, rememberMe);

      if (originalUrl) {
        this.view.navigate(originalUrl);
      } else {
        this.view.navigate(`/feed/${user.alias}`);
      }
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to log user in because of exception: ${error}`
      );
    } finally {
      this.view.setIsLoading(false);
    }
  }
}
