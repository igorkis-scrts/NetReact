import { RootState } from "./State/RootState";
import { configure } from "mobx";

export function configureApp(): { stores: RootState } {
  configure({
    enforceActions: "observed",
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
  });

  return {
    stores: new RootState(),
  };
}
