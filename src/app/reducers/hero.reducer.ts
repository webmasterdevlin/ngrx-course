import { Hero } from "../hero/hero.model";
import { createReducer, on } from "@ngrx/store";
import * as HeroActions from "../hero/hero.actions";

export interface HeroState {
  heroes: Hero[];
  hero: Hero;
  isLoading: boolean;
  error: string;
}

export const initialState: HeroState = {
  heroes: [],
  hero: {} as Hero,
  isLoading: false,
  error: ""
};

export const heroReducer = createReducer(
  initialState,
  /*loads the list of heroes*/
  on(HeroActions.loadHeroes, state => ({
    ...state,
    requesting: true
  })),
  on(HeroActions.loadHeroesSuccess, (state, { heroes }) => ({
    ...state,
    heroes
  })),
  on(HeroActions.loadHeroesFail, (state, { error }) => ({
    ...state,
    heroes: [],
    error
  })),
  /*deletes a hero*/
  on(HeroActions.deleteHero, state => ({
    ...state,
    requesting: true
  })),
  on(HeroActions.deleteHeroSuccess, (state, { heroId }) => ({
    ...state,
    heroes: state.heroes.filter(v => v.id !== heroId),
    requesting: false
  })),
  on(HeroActions.deleteHeroFail, (state, { error }) => ({
    ...state,
    error,
    requesting: false
  })),
  /*creates a hero*/
  on(HeroActions.createHero, state => ({
    ...state,
    requesting: true
  })),
  on(HeroActions.createHeroSuccess, (state, { hero }) => ({
    ...state,
    heroes: [...state.heroes, hero]
  })),
  on(HeroActions.createHeroFail, (state, { error }) => ({
    ...state,
    error,
    requesting: false
  })),
  /*updates a hero*/
  on(HeroActions.updateHero, state => ({
    ...state,
    requesting: true
  })),
  on(HeroActions.updateHeroSuccess, (state, { hero }) => ({
    ...state,
    heroes: state.heroes.map(v => (v.id === hero.id ? hero : v))
  })),
  on(HeroActions.updateHeroFail, (state, { error }) => ({
    ...state,
    error,
    requesting: false
  }))
);
