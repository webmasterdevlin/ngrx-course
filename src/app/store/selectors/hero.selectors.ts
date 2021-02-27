import { createSelector } from "@ngrx/store";
import { State } from "src/app/store";

export const selectHeroesState = (state: State) => state.heroes;

export const selectHeroStore = createSelector(
  selectHeroesState,
  (state) => state
);
