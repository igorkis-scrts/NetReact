import { Authentication } from "../Authentication/Authentication";
import { SignUpForm } from "./SignUpForm/SignUpForm";

interface ISignUpProps {
  closeDialog?: () => void;
}

const SignUp = ({ closeDialog }: ISignUpProps) => {
  return (
    <Authentication isSignIn={false}>
      <SignUpForm closeDialog={closeDialog}/>
    </Authentication>
  );
};

export { SignUp };
