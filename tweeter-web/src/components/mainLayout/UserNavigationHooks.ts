// src/navigation/UserNavigationHooks.ts
import { useNavigate } from "react-router-dom";
import { AuthToken, FakeData, User } from "tweeter-shared";
import { useMessageActions } from "../toaster/MessageHooks";
import { useUserInfo, useUserInfoActions } from "../userInfo/UserInfoHooks";

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

  const getUser = async (token: AuthToken, alias: string): Promise<User | null> => {
    // TODO: Replace with real server call
    return FakeData.instance.findUserByAlias(alias);
  };

  const coreNavigate = async (alias: string, basePath = "/feed") => {
    try {
      if (!authToken) {
        displayErrorMessage("You must be signed in to view profiles.");
        return;
      }

      const atAlias = normalizeAlias(alias);
      const toUser = await getUser(authToken, atAlias);

      if (toUser) {
        if (!displayedUser || !toUser.equals(displayedUser)) {
          setDisplayedUser(toUser);
          navigate(`${basePath}/${toUser.alias}`);
        }
      }
    } catch (error) {
      displayErrorMessage(`Failed to get user because of exception: ${error}`);
    }
  };

  return {
    navigateToUser: async (event, alias, basePath) => {
      event.preventDefault();
      await coreNavigate(alias, basePath);
    },
    goToUser: async (alias, basePath) => {
      await coreNavigate(alias, basePath);
    },
  };
};
