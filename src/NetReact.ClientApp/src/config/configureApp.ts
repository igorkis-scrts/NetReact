import { configure } from "mobx";
import { RootState } from "./state/RootState";

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
