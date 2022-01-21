import { Authentication } from "../Authentication/Authentication";
import { SignInForm } from "./SignInForm/SignInForm";

const SignIn = () => {
  return (
    <Authentication isSignIn={true}>
      <SignInForm />
    </Authentication>
  );
};

export { SignIn };
