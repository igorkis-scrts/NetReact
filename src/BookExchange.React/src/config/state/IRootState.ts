import { AppStore } from "@app/stores/AppStore";
import { AuthStore } from "@stores/AuthStore";

export interface IRootState {
  app: AppStore;
  auth: AuthStore;
}
