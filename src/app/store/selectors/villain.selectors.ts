import { createSelector } from "@ngrx/store";
import { State } from "../../store";

export const selectVillainsState = (state: State) => state.villains;

export const selectVillainStore = createSelector(
  selectVillainsState,
  (state) => state
);
