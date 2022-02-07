import { makeObservable, observable, action, runInAction } from "mobx";

export class AppStore {
  public isAppInitialized: boolean = false;

  constructor() {
    makeObservable(this, {
      isAppInitialized: observable,

      initialize: action,
    });
  }

  public initialize(): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        runInAction(() => {
          this.isAppInitialized = true;
        });
      }, 1000);

      resolve();
    }).catch((error) => {
      // notify(error, "error");
      throw error;
    });
  }

  public test() {
    console.log(this);
  }
}
