import { ActionReducerMap, createSelector } from "@ngrx/store";
import { heroReducer, HeroState } from "./reducers/hero.reducer";
import { villainReducer, VillainState } from "./reducers/villain.reducer";

export interface State {
  heroes: HeroState;
  villains: VillainState;
}

export const reducers: ActionReducerMap<State> = {
  heroes: heroReducer,
  villains: villainReducer,
};

export const selectHeroesState = (state: State) => state.heroes;

export const selectHeroStore = createSelector(
  selectHeroesState,
  (state) => state
);

export const selectVillainsState = (state: State) => state.villains;

export const selectVillainStore = createSelector(
  selectVillainsState,
  (state) => state
);
