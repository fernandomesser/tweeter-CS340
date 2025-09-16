import { useState } from "react";
import { User, AuthToken } from "tweeter-shared";

type SubmitFn = () => Promise<void>;

interface Props {
  authAction: SubmitFn;
  checkSubmitButtonStatus: boolean;
}

const AuthenticationFields = (props: Props) => {
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");

  const submitOnEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key == "Enter" && !props.checkSubmitButtonStatus) {
      props.authAction();
    }
  };

  return (
    <>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          size={50}
          id="aliasInput"
          placeholder="name@example.com"
          onKeyDown={submitOnEnter}
          onChange={(event) => setAlias(event.target.value)}
        />
        <label htmlFor="aliasInput">Alias</label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="passwordInput"
          placeholder="Password"
          onKeyDown={submitOnEnter}
          onChange={(event) => setPassword(event.target.value)}
        />
        <label htmlFor="passwordInput">Password</label>
      </div>
    </>
  );
};

export default AuthenticationFields;
