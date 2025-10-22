import { MemoryRouter } from "react-router-dom";
import PostStatus from "../../../src/components/postStatus/PostStatus";
import { PostStatusPresenter } from "../../../src/presenter/PostStatusPresenter";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { instance, mock, verify } from "@typestrong/ts-mockito";
import { User, AuthToken } from "tweeter-shared";

jest.mock("../../../src/components/toaster/MessageHooks", () => ({
  useMessageActions: () => ({
    displayInfoMessage: jest.fn(),
    displayErrorMessage: jest.fn(),
    deleteMessage: jest.fn(),
  }),
}));
jest.mock("../../../src/components/userInfo/UserInfoHooks", () => ({
  useUserInfo: jest.fn(),
}));
import { useUserInfo } from "../../../src/components/userInfo/UserInfoHooks";

describe("PostStatus Component", () => {
  beforeEach(() => jest.clearAllMocks());

  it("starts with the Post Status and Clear buttons disabled", () => {
    (useUserInfo as jest.Mock).mockReturnValue({
      currentUser: undefined,
      authToken: undefined,
    });

    const { postStatusButton, clearStatusButton } =
      renderPostStatusAndGetElement();
    expect(postStatusButton).toBeDisabled();
    expect(clearStatusButton).toBeDisabled();
  });

  it("enables the Post Status and Clear buttons if field have text", async () => {
    (useUserInfo as jest.Mock).mockReturnValue({
      currentUser: new User("name", "lastName", "alias", "image"),
      authToken: new AuthToken("abc123", Date.now()),
    });

    const { postStatusButton, statusField, clearStatusButton, user } =
      renderPostStatusAndGetElement();

    await user.type(statusField, "a");

    expect(postStatusButton).toBeEnabled();
    expect(clearStatusButton).toBeEnabled();
  });

  it("disables the Post Status and Clear buttons if field is cleared", async () => {
    (useUserInfo as jest.Mock).mockReturnValue({
      currentUser: new User("name", "lastName", "alias", "image"),
      authToken: new AuthToken("abc123", Date.now()),
    });

    const { postStatusButton, statusField, clearStatusButton, user } =
      renderPostStatusAndGetElement();

    await user.type(statusField, "a");
    expect(postStatusButton).toBeEnabled();
    expect(clearStatusButton).toBeEnabled();

    await user.clear(statusField);
    expect(postStatusButton).toBeDisabled();
    expect(clearStatusButton).toBeDisabled();
  });

  it("calls the presenter's postStatus method with correct parameters when the Post Status button is pressed", async () => {
    const mockPresenter = mock<PostStatusPresenter>();
    const mockPresenterInstance = instance(mockPresenter);

    const post = "Post Status";
    const currentUser = new User("name", "lastName", "alias", "image");
    const authToken = new AuthToken("abc123", Date.now());

    (useUserInfo as jest.Mock).mockReturnValue({ currentUser, authToken });

    const { postStatusButton, statusField, user } =
      renderPostStatusAndGetElement(mockPresenterInstance);

    await user.type(statusField, post);
    await user.click(postStatusButton);

    verify(mockPresenter.submitPost(post, currentUser, authToken)).once();
  });
});

function renderPostStatus(presenter?: PostStatusPresenter) {
  return render(
    <MemoryRouter>
      {!!presenter ? <PostStatus presenter={presenter} /> : <PostStatus />}
    </MemoryRouter>
  );
}

function renderPostStatusAndGetElement(presenter?: PostStatusPresenter) {
  const user = userEvent.setup();

  renderPostStatus(presenter);

  const statusField = screen.getByLabelText("status");
  const postStatusButton = screen.getByRole("button", { name: /Post Status/i });
  const clearStatusButton = screen.getByRole("button", { name: /Clear/i });

  return { user, postStatusButton, clearStatusButton, statusField };
}
