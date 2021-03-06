import { AccountApi } from "@api/Account.api";
import { UserApi } from "@api/User.api";
import { makeObservable, observable, action, runInAction, computed, reaction } from "mobx";
import { SignUpData, User } from "@app/types";

export class AuthStore {
  private _logoutTimerId: NodeJS.Timeout | null = null;

  public token: string | null = null;
  public tokenExpirationTime: Date | null = null;
  public user: User | null = null;

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  constructor() {
    makeObservable(this, {
      token: observable,
      tokenExpirationTime: observable,
      user: observable,

      isLoggedIn: computed,

      signIn: action,
      signUp: action,
      signOut: action,
      fetchCurrentUser: action,
      trySilentLogin: action,
    });

    reaction(
      () => [this.token, this.tokenExpirationTime, this.signOut],
      () => {
        if (this.token && this.tokenExpirationTime) {
          const remainingTime = this.tokenExpirationTime.getTime() - new Date().getTime();
          this._logoutTimerId = setTimeout(this.signOut, remainingTime);
        } else {
          if (this._logoutTimerId) {
            clearTimeout(this._logoutTimerId);
          }
        }
      }
    );
  }

  public async signIn(username: string, password: string) {
    const { access_token, expires_in } = await AccountApi.requestToken(username, password);

    const expirationTime = new Date(new Date().getTime() + Number(expires_in) * 1000);

    this.storeAuth(access_token, expirationTime);
  }

  public async signUp(signUpData: SignUpData) {
    await AccountApi.signUp(signUpData);

    const { access_token, expires_in } = await AccountApi.requestToken(
      signUpData.username,
      signUpData.password
    );

    const expirationTime = new Date(new Date().getTime() + Number(expires_in) * 1000);

    this.storeAuth(access_token, expirationTime);

    await UserApi.createProfile();
  }

  public signOut() {
    this.token = null;
    this.tokenExpirationTime = null;
    this.user = null;

    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpirationTime");
    localStorage.removeItem("user");
  }

  public async fetchCurrentUser() {
    const response = await UserApi.getCurrentUser();

    if (!response.hasError()) {
      runInAction(() => {
        this.user = response.data!;
      });
      localStorage.setItem("user", JSON.stringify(response.data!));
    }
  }

  public trySilentLogin(): Promise<void> {
    return new Promise<void>((resolve) => {
      const token = localStorage.getItem("token");
      const expirationTime = localStorage.getItem("tokenExpirationTime");
      const user = localStorage.getItem("user");

      if (token && expirationTime && new Date(expirationTime) > new Date()) {
        this.storeAuth(token, new Date(expirationTime));

        if (user) {
          runInAction(() => {
            this.user = JSON.parse(user);
          });
        }
      }

      resolve();
    }).catch((error) => {
      throw error;
    });
  }

  private storeAuth(token: string, expirationTime: Date) {
    runInAction(() => {
      this.token = token;
      this.tokenExpirationTime = expirationTime;
    });

    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpirationTime", expirationTime.toISOString());
  }
}
