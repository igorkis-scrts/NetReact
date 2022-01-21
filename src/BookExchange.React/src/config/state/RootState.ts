import { AppStore } from "@app/stores/AppStore";
import { AuthStore } from "@stores/AuthStore";
import { IRootState } from "./IRootState";

export class RootState implements IRootState {
  app: AppStore;
  auth: AuthStore;

  constructor() {
    this.app = new AppStore();
    this.auth = new AuthStore();
  }
}
