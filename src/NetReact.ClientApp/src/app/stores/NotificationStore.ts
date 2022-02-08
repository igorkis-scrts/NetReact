import { INotification } from "@models/INotification";
import { makeObservable, observable, action } from "mobx";

import { nanoid } from "nanoid";
import { OptionsObject } from "notistack";

export class NotificationStore {
  public notifications: INotification[] = [];

  constructor() {
    makeObservable(this, {
      notifications: observable,

      enqueueSnackbar: action,
      removeSnackbar: action
    });
  }

  public enqueueSnackbar(notification: string, options: OptionsObject = { variant: "default" }) {
    this.notifications.push({
      id: nanoid(),
      message: notification,
      options: options
    });
  }

  public removeSnackbar(id: string) {
    this.notifications = this.notifications.filter(notification => notification.id !== id);
  }
}