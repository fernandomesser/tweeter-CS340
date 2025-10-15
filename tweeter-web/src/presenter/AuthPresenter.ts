import { AuthToken, User } from "tweeter-shared";
import { Presenter, View } from "./Presenter";
import { UserService } from "../model.service/UserService";

export interface AuthView extends View {
  setIsLoading(value: boolean): void;
  updateUserInfo(
    currentUser: User,
    displayedUser: User,
    authToken: AuthToken,
    rememberMe: boolean
  ): void;
  navigate(url: string): void;
}

export class AuthPresenter<V extends AuthView> extends Presenter<V> {
  protected _service: UserService;
  public constructor(view: V) {
    super(view);
    this._service = new UserService();
  }

  protected get service() {
    return this._service;
  }

  protected async doAuthOperation(
    authFunction: () => Promise<[User, AuthToken]>,
    navigateTo: string | ((user: User) => string),
    operationDescription: string,
    rememberMe: boolean
  ) {
    await this.doFailureReportingOperation(async () => {
      this.view.setIsLoading(true);
      try {
        const [user, authToken] = await authFunction();
        this.view.updateUserInfo(user, user, authToken, rememberMe);

        const destination =
          typeof navigateTo === "function"
            ? navigateTo(user)
            : navigateTo.replace(":alias", user.alias);
        this.view.navigate(destination);
      } finally {
        this.view.setIsLoading(false);
      }
    }, operationDescription);
  }
}
