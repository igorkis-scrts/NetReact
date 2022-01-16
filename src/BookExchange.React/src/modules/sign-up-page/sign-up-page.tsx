import React from "react";

import { Authentication } from "components/authentication";
import { SignUpForm } from "components/forms";

const SignUpPage = () => {
  return (
    <Authentication isSignIn={false}>
      <SignUpForm />
    </Authentication>
  );
};

export { SignUpPage };
