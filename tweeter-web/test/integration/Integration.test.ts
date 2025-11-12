import "isomorphic-fetch";
import { ServerFacade } from "../../src/model/ServerFacade";
import {
  User,
  AuthToken,
  RegisterRequest,
  Status,
  FollowServiceRequest,
} from "tweeter-shared";
import {
  PagedStatusItemRequest,
  PagedUserItemRequest,
} from "tweeter-shared/dist/model/net/request/PagedItemRequest";

describe("Integration Tests", () => {
  let serverFacade: ServerFacade;

  beforeEach(() => {
    serverFacade = new ServerFacade();
  });

  test("register", async () => {
    const request: RegisterRequest = {
      firstName: "Test",
      lastName: "User",
      alias: "testuser",
      password: "SecurePass123!",
      userImageBytes: "",
      imageFileExtension: ".png",
    };

    const [user, authToken] = await serverFacade.register(request);

    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(User);
    expect(authToken).toBeInstanceOf(AuthToken);
  });

  test("getStoryItems", async () => {
    const request: PagedStatusItemRequest = {
      token: "fakeToken123",
      userAlias: "testuser",
      pageSize: 10,
      lastItem: null,
    };

    const [items, hasMore] = await serverFacade.getStoryItems(request);

    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBeGreaterThan(0);
    expect(items[0]).toBeInstanceOf(Status);
    expect(items[0].user).toBeInstanceOf(User);
    expect(items[0].user.firstName).not.toBe(null);
    expect(hasMore).toBe(true);
  });

  test("getFollowees", async () => {
    const request: PagedUserItemRequest = {
      token: "fakeToken123",
      userAlias: "testuser",
      pageSize: 10,
      lastItem: null,
    };

    const [items, hasMore] = await serverFacade.getFollowees(request);

    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBeGreaterThan(0);
    expect(items[0]).toBeInstanceOf(User);
    expect(hasMore).toBe(true);
  });

  test("getFollowers", async () => {
    const request: PagedUserItemRequest = {
      token: "fakeToken123",
      userAlias: "testuser",
      pageSize: 10,
      lastItem: null,
    };

    const [items, hasMore] = await serverFacade.getFollowers(request);

    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBeGreaterThan(0);
    expect(items[0]).toBeInstanceOf(User);
    expect(hasMore).toBe(true);
  });

  test("getFollowerCount", async () => {
    const request: FollowServiceRequest = {
      token: "fakeToken123",
      user: new User("null", "test", "test2", "image"),
    };

    const number = await serverFacade.getFollowerCount(request);
    expect(number).toBeGreaterThanOrEqual(0);
  });
});
