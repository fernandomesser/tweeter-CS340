type SubmitFn = () => Promise<void>;

interface Props {
  authAction: SubmitFn;
  checkSubmitButtonStatus: boolean;
  alias: string;
  password: string;
  onAliasChange: (alias: string) => void;
  onPasswordChange: (password: string) => void;
}

const AuthenticationFields = (props: Props) => {
  const submitOnEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" && !props.checkSubmitButtonStatus) {
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
          placeholder="Alias"
          value={props.alias}
          onKeyDown={submitOnEnter}
          onChange={(e) => props.onAliasChange(e.target.value)}
        />
        <label htmlFor="aliasInput">Alias</label>
      </div>

      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="passwordInput"
          placeholder="Password"
          value={props.password}
          onKeyDown={submitOnEnter}
          onChange={(e) => props.onPasswordChange(e.target.value)}
        />
        <label htmlFor="passwordInput">Password</label>
      </div>
    </>
  );
};

export default AuthenticationFields;
