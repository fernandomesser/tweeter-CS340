import { User, AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { Presenter, View } from "./Presenter";

export interface UserNavigationView extends View {
  normalizeAlias: (alias: string) => string;
  navigate: (url: string) => void;
  setDisplayedUser: (user: User) => void;
}

export class UserNavigationPresenter extends Presenter<UserNavigationView> {
  private userService: UserService;

  public constructor(view: UserNavigationView) {
    super(view);
    this.userService = new UserService();
  }

  public async coreNavigate(
    alias: string,
    basePath = "/feed",
    authToken: AuthToken,
    displayedUser: User
  ) {
    this.doFailureReportingOperation(async () => {
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
    }, "get user");
  }
}
