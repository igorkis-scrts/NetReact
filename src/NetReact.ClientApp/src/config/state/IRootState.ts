import { AppStore } from "@app/stores/AppStore";
import { AuthStore } from "@stores/AuthStore";
import { NotificationStore } from "@stores/NotificationStore";

export interface IRootState {
  app: AppStore;
  auth: AuthStore;
  notification: NotificationStore;
}
