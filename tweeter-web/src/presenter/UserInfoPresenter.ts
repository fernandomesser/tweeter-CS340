import { User, AuthToken } from "tweeter-shared";
import { FollowService } from "../model/service/FollowService";
import { MessageView, Presenter } from "./Presenter";

export interface UserInfoView extends MessageView {
  setIsFollower(isFollower: boolean): void;
  setFolloweeCount: (followeeCount: number) => void;
  setFollowerCount: (followerCount: number) => void;
  setIsLoading(value: boolean): void;
}

export class UserInfoPresenter extends Presenter<UserInfoView> {
  private service: FollowService;

  public constructor(view: UserInfoView) {
    super(view);
    this.service = new FollowService();
  }

  public async setIsFollowerStatus(
    authToken: AuthToken,
    currentUser: User,
    displayedUser: User
  ) {
    this.doFailureReportingOperation(async () => {
      if (currentUser === displayedUser) {
        this.view.setIsFollower(false);
      } else {
        this.view.setIsFollower(
          await this.service.getIsFollowerStatus(
            authToken!,
            currentUser!,
            displayedUser!
          )
        );
      }
    }, "determine follower status");
  }

  public async setNumbFollowees(authToken: AuthToken, displayedUser: User) {
    this.doFailureReportingOperation(async () => {
      this.view.setFolloweeCount(
        await this.service.getFolloweeCount(authToken, displayedUser)
      );
    }, "get followees count");
  }

  public async setNumbFollowers(authToken: AuthToken, displayedUser: User) {
    this.doFailureReportingOperation(async () => {
      this.view.setFollowerCount(
        await this.service.getFollowerCount(authToken, displayedUser)
      );
    }, "get followers count");
  }

  private async doFollowOperation(
    displayedUser: User,
    authToken: AuthToken,
    mode: "follow" | "unfollow"
  ): Promise<void> {
    this.doFailureReportingOperation(async () => {
      var userToast = "";

      try {
        this.view.setIsLoading(true);

        const verb = mode === "follow" ? "Following" : "Unfollowing";
        userToast = this.view.displayInfoMessage(
          `${verb} ${displayedUser!.name}...`,
          0
        );

        const [followerCount, followeeCount] =
          mode === "follow"
            ? await this.service.follow(authToken, displayedUser)
            : await this.service.unfollow(authToken, displayedUser);

        this.view.setIsFollower(mode === "follow");
        this.view.setFollowerCount(followerCount);
        this.view.setFolloweeCount(followeeCount);
      } finally {
        this.view.deleteMessage(userToast);
        this.view.setIsLoading(false);
      }
    }, `${mode} user)`);
  }

  public async followDisplayedUser(
    displayedUser: User,
    authToken: AuthToken
  ): Promise<void> {
    this.doFollowOperation(displayedUser, authToken, "follow");
  }

  public async unfollowDisplayedUser(
    displayedUser: User,
    authToken: AuthToken
  ): Promise<void> {
    this.doFollowOperation(displayedUser, authToken, "unfollow");
  }
}
