import { SignUpData, TokenRequestResult } from "@app/types";
import { ApiBase } from "@utils/api/ApiBase";
import { fetchIdentity } from "@utils/api/fetchIdentity";

export class AccountApi extends ApiBase {
  public static async requestToken(username: string, password: string): Promise<TokenRequestResult> {
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

    return await fetchIdentity("/connect/token", requestOptions);
  }

  public static async signUp(userData: SignUpData): Promise<TokenRequestResult> {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    return fetchIdentity("/api/identity/register", requestOptions);
  }
}
