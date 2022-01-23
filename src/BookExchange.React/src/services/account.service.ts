import { Account } from "../app/types";
import { fetchIdentity } from "./fetchIdentity";

const SignUp = async (userData: Account.SignUpData) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };

  return fetchIdentity(`/api/identity/register`, requestOptions);
};

const RequestToken = async (
  username: string,
  password: string
): Promise<Account.TokenRequestResult> => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: new URLSearchParams({
      grant_type: "password",
      client_id: "client",
      username: username,
      password: password,
      scope: "bookApi profile",
    }),
  };

  return fetchIdentity(`/connect/token`, requestOptions);
};

const AccountService = {
  SignUp,
  RequestToken,
};

export { AccountService };
