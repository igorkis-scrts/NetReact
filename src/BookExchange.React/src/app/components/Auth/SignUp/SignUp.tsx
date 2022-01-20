import { Authentication } from "../Authentication/Authentication";
import { SignUpForm } from "./SignUpForm/SignUpForm";

const SignUp = () => {
  return (
    <Authentication isSignIn={false}>
      <SignUpForm />
    </Authentication>
  );
};

export { SignUp };