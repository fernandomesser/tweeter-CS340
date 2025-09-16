import { Link, useNavigate } from "react-router-dom";
import { AuthToken, FakeData, Status, User } from "tweeter-shared";
import Post from "./Post";
import { ToastType } from "../toaster/Toast";
import { useContext } from "react";
import { ToastActionsContext } from "../toaster/ToastContexts";
import {
  UserInfoActionsContext,
  UserInfoContext,
} from "../userInfo/UserInfoContexts";

interface Props {
  status: Status;
}

const StatusItem = (props: Props) => {
  const navigate = useNavigate();
  const { displayToast } = useContext(ToastActionsContext);
  const { setDisplayedUser } = useContext(UserInfoActionsContext);
  const { displayedUser, authToken } = useContext(UserInfoContext);

  const extractAlias = (value: string): string => {
    const index = value.indexOf("@");
    return value.substring(index);
  };

  const getUser = async (
    authToken: AuthToken,
    alias: string
  ): Promise<User | null> => {
    // TODO: Replace with the result of calling server
    return FakeData.instance.findUserByAlias(alias);
  };

  const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();

    try {
      const alias = extractAlias(event.target.toString());

      const toUser = await getUser(authToken!, alias);

      if (toUser) {
        if (!toUser.equals(displayedUser!)) {
          setDisplayedUser(toUser);
          navigate(`/feed/${toUser.alias}`);
        }
      }
    } catch (error) {
      displayToast(
        ToastType.Error,
        `Failed to get user because of exception: ${error}`,
        0
      );
    }
  };

  return (
    <div className="col bg-light mx-0 px-0">
      <div className="container px-0">
        <div className="row mx-0 px-0">
          <div className="col-auto p-3">
            <img
              src={props.status.user.imageUrl}
              className="img-fluid"
              width="80"
              alt="Posting user"
            />
          </div>
          <div className="col">
            <h2>
              <b>
                {props.status.user.firstName} {props.status.user.lastName}
              </b>{" "}
              -{" "}
              <Link
                to={`/feed/${props.status.user.alias}`}
                onClick={navigateToUser}
              >
                {props.status.user.alias}
              </Link>
            </h2>
            {props.status.formattedDate}
            <br />
            <Post status={props.status} featurePath="/feed" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusItem;
