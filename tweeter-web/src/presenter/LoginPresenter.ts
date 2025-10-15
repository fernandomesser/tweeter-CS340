import { AuthPresenter, AuthView } from "./AuthPresenter";

export class LoginPresenter extends AuthPresenter<AuthView> {
  public async doLogin(
    alias: string,
    password: string,
    rememberMe: boolean,
    originalUrl?: string
  ) {
    await this.doAuthOperation(
      () => this.service.login(alias, password),
      (user) => originalUrl ?? `/feed/${user.alias}`,
      "log user in",
      rememberMe
    );
  }
}
