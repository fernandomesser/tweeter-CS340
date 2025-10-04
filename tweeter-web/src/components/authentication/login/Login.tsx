import "./Login.css";
import "bootstrap/dist/css/bootstrap.css";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationFormLayout from "../AuthenticationFormLayout";
import AuthenticationFields from "../AuthenticationFields";
import { useMessageActions } from "../../toaster/MessageHooks";
import { useUserInfoActions } from "../../userInfo/UserInfoHooks";
import { LoginPresenter, LoginView } from "../../../presenter/LoginPresenter";

interface Props {
  originalUrl?: string;
}

const Login = (props: Props) => {
  const [alias, setAlias] = useState(""); // <-- moved here
  const [password, setPassword] = useState(""); // <-- moved here
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { updateUserInfo } = useUserInfoActions();
  const { displayErrorMessage } = useMessageActions();

  const listener: LoginView = {
    setIsLoading: setIsLoading,
    navigate: navigate,
    displayErrorMessage: displayErrorMessage,
    updateUserInfo: updateUserInfo,
  };

  const presenterRef = useRef<LoginPresenter | null>(null);
  if (!presenterRef.current) {
    presenterRef.current = new LoginPresenter(listener);
  }

  const checkSubmitButtonStatus = (): boolean => {
    return !alias || !password;
  };

  const doLogin = async () => {
    presenterRef.current!.doLogin(
      alias,
      password,
      rememberMe,
      props.originalUrl
    );
  };

  const inputFieldFactory = () => (
    <AuthenticationFields
      authAction={doLogin}
      checkSubmitButtonStatus={checkSubmitButtonStatus()}
      alias={alias}
      password={password}
      onAliasChange={setAlias}
      onPasswordChange={setPassword}
    />
  );

  const switchAuthenticationMethodFactory = () => (
    <div className="mb-3">
      Not registered? <Link to="/register">Register</Link>
    </div>
  );

  return (
    <AuthenticationFormLayout
      headingText="Please Sign In"
      submitButtonLabel="Sign in"
      oAuthHeading="Sign in with:"
      inputFieldFactory={inputFieldFactory}
      switchAuthenticationMethodFactory={switchAuthenticationMethodFactory}
      setRememberMe={setRememberMe}
      submitButtonDisabled={checkSubmitButtonStatus} // likely expects a fn
      isLoading={isLoading}
      submit={doLogin}
    />
  );
};

export default Login;
