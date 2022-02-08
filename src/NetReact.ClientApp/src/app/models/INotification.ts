import { OptionsObject } from "notistack";

export interface INotification {
  id: string;
  message: string;
  options?: OptionsObject;
}