import { createSelector } from "@ngrx/store";
import { State } from "../../store";

export const selectHeroesState = (state: State) => state.heroes;

export const selectHeroStore = createSelector(
  selectHeroesState,
  (state) => state
);
