import { createSelector } from "@ngrx/store";
import { State } from "src/app/store";

export const selectVillainsState = (state: State) => state.villains;

export const selectVillainStore = createSelector(
  selectVillainsState,
  (state) => state
);
