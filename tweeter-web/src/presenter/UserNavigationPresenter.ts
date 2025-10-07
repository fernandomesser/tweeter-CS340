import { User, AuthToken } from "tweeter-shared";
import { UserService } from "../model.service/UserService";

export interface UserNavigationView {
  displayErrorMessage: (message: string) => string;
  normalizeAlias: (alias: string) => string;
  navigate: (url: string) => void;
  setDisplayedUser: (user: User) => void;
}

export class UserNavigationPresenter {
  private userService: UserService;
  private view: UserNavigationView;

  public constructor(view: UserNavigationView) {
    this.userService = new UserService();
    this.view = view;
  }

  public async coreNavigate(
    alias: string,
    basePath = "/feed",
    authToken: AuthToken,
    displayedUser: User
  ) {
    try {
      if (!authToken) {
        this.view.displayErrorMessage(
          "You must be signed in to view profiles."
        );
        return;
      }

      const atAlias = this.view.normalizeAlias(alias);
      const toUser = await this.userService.getUser(authToken, atAlias);

      if (toUser) {
        if (!displayedUser || !toUser.equals(displayedUser)) {
          this.view.setDisplayedUser(toUser);
          this.view.navigate(`${basePath}/${toUser.alias}`);
        }
      }
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to get user because of exception: ${error}`
      );
    }
  }
}
