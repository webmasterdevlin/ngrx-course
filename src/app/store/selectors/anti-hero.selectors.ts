import { createSelector } from "@ngrx/store";
import { State } from "src/app/store";

export const selectAntiHeroesState = (state: State) => state.antiHeroes;

export const selectAntiHeroStore = createSelector(
  selectAntiHeroesState,
  (state) => state
);
