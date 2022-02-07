import { Authentication } from "../Authentication/Authentication";
import { SignInForm } from "./SignInForm/SignInForm";

interface ISignInProps {
  closeDialog?: () => void;
}

const SignIn = ({ closeDialog }: ISignInProps) => {
  return (
    <Authentication isSignIn={true}>
      <SignInForm closeDialog={closeDialog} />
    </Authentication>
  );
};

export { SignIn };
