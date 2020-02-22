import { ActionReducerMap, createSelector, MetaReducer } from "@ngrx/store";
import { environment } from "../../environments/environment";
import { heroReducer, HeroState } from "./hero.reducer";

export interface State {
  heroes: HeroState;
}

export const reducers: ActionReducerMap<State> = {
  heroes: heroReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export const selectHeroesState = (state: State) => state.heroes;
export const selectHeroStore = createSelector(
  selectHeroesState,
  (state: HeroState) => state
);
