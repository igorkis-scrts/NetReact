import { configureMapper } from "./mapper/configureMapper";
import { configure } from "mobx";
import { RootState } from "./state/RootState";

export function configureApp(): { stores: RootState } {
  configure({
    enforceActions: "observed",
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
  });

  configureMapper();

  return {
    stores: new RootState(),
  };
}
