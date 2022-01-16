import { IRootState } from "@config/State/IRootState";
import { MobXProviderContext } from "mobx-react";
import { useContext } from "react";

export function useStores(): Partial<IRootState> {
  return useContext(MobXProviderContext);
}
