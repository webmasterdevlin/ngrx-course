import { ActionReducerMap } from "@ngrx/store";
import { heroReducer, HeroState } from "./reducers/hero.reducer";
import { villainReducer, VillainState } from "./reducers/villain.reducer";
import { antiHeroReducer, AntiHeroState } from "./reducers/anti-hero.reducer";

export interface State {
  heroes: HeroState;
  villains: VillainState;
  antiHeroes: AntiHeroState;
}

export const reducers: ActionReducerMap<State> = {
  heroes: heroReducer,
  villains: villainReducer,
  antiHeroes: antiHeroReducer,
};
