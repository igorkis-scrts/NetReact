import { AppStore } from "@app/stores/AppStore";
import { AuthStore } from "@stores/AuthStore";
import { NotificationStore } from "@stores/NotificationStore";
import { IRootState } from "./IRootState";

export class RootState implements IRootState {
  app: AppStore;
  auth: AuthStore;
  notification: NotificationStore;

  constructor() {
    this.app = new AppStore();
    this.auth = new AuthStore();
    this.notification = new NotificationStore();
  }
}
