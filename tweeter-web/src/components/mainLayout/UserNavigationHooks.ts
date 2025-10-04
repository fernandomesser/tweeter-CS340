import { useNavigate } from "react-router-dom";
import { useMessageActions } from "../toaster/MessageHooks";
import { useUserInfo, useUserInfoActions } from "../userInfo/UserInfoHooks";
import {
  UserNavigationPresenter,
  UserNavigationView,
} from "../../presenter/UserNavigationPresenter";
import { useRef } from "react";

export interface UserNavigationActions {
  /**
   * Handle a click on a user alias link. Prevents default, loads the user,
   * updates displayedUser if needed, and navigates to the path.
   */
  navigateToUser: (
    event: React.MouseEvent,
    alias: string,
    basePath?: string
  ) => Promise<void>;

  /**
   * Programmatic version (no click event). Useful when navigating from code.
   */
  goToUser: (alias: string, basePath?: string) => Promise<void>;
}

export const useUserNavigation = (): UserNavigationActions => {
  const navigate = useNavigate();
  const { displayErrorMessage } = useMessageActions();
  const { displayedUser, authToken } = useUserInfo();
  const { setDisplayedUser } = useUserInfoActions();

  const normalizeAlias = (alias: string) =>
    alias.startsWith("@") ? alias : `@${alias}`;

  const listener: UserNavigationView = {
    displayErrorMessage: displayErrorMessage,
    navigate: navigate,
    setDisplayedUser: setDisplayedUser,
    normalizeAlias: normalizeAlias,
  };

  const presenterRef = useRef<UserNavigationPresenter | null>(null);
  if (!presenterRef.current) {
    presenterRef.current = new UserNavigationPresenter(listener);
  }

  return {
    navigateToUser: async (event, alias, basePath) => {
      event.preventDefault();
      await presenterRef.current!.coreNavigate(
        alias,
        basePath,
        authToken!,
        displayedUser!
      );
    },
    goToUser: async (alias, basePath) => {
      await presenterRef.current!.coreNavigate(
        alias,
        basePath,
        authToken!,
        displayedUser!
      );
    },
  };
};
