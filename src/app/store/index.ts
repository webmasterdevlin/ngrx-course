import { ActionReducerMap } from '@ngrx/store';
import { heroReducer, HeroState } from './reducers/hero.reducer';
import { villainReducer, VillainState } from './reducers/villain.reducer';

export interface State {
  heroes: HeroState;
  villains: VillainState;
}

export const reducers: ActionReducerMap<State> = {
  heroes: heroReducer,
  villains: villainReducer,
};
