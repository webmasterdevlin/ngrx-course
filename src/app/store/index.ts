import { ActionReducerMap, createSelector } from "@ngrx/store";
import { heroReducer, HeroState } from "./reducers/hero.reducer";

export interface State {
  heroes: HeroState;
}

export const reducers: ActionReducerMap<State> = {
  heroes: heroReducer
};

export const selectHeroesState = (state: State) => state.heroes;
export const selectHeroStore = createSelector(
  selectHeroesState,
  (state: HeroState) => state
);
