import { makeObservable, observable, action, runInAction } from "mobx";

export class AppStore {
  public isAppInitialized: boolean = false;

  constructor() {
    makeObservable(this, {
      isAppInitialized: observable,

      initialize: action,
    });
  }

  public initialize(): Promise<string> {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        runInAction(() => {
          this.isAppInitialized = true;
        });
      }, 1000);

      resolve("App has been initialized.");
    }).catch((error) => {
      // notify(error, "error");
      throw error;
    });
  }

  public test() {
    console.log(this);
  }
}
