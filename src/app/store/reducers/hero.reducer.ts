import { createReducer, on } from "@ngrx/store";
import * as HeroActions from "../actions/hero.actions";
import { Hero } from "../../features/hero/hero.model";

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
    isLoading: true
  })),
  on(HeroActions.loadHeroesSuccess, (state, { heroes }) => ({
    ...state,
    heroes,
    isLoading: false
  })),
  on(HeroActions.loadHeroesFail, (state, { error }) => ({
    ...state,
    heroes: [],
    error,
    isLoading: false
  })),
  /*deletes a hero*/
  on(HeroActions.deleteHero, state => ({
    ...state,
    isLoading: true
  })),
  on(HeroActions.deleteHeroSuccess, (state, { id }) => ({
    ...state,
    heroes: state.heroes.filter(h => h.id !== id),
    isLoading: false
  })),
  on(HeroActions.deleteHeroFail, (state, { error }) => ({
    ...state,
    error,
    isLoading: false
  })),
  /*creates a hero*/
  on(HeroActions.createHero, state => ({
    ...state,
    isLoading: true
  })),
  on(HeroActions.createHeroSuccess, (state, { hero }) => ({
    ...state,
    heroes: [...state.heroes, hero],
    isLoading: false
  })),
  on(HeroActions.createHeroFail, (state, { error }) => ({
    ...state,
    error,
    isLoading: false
  })),
  /*updates a hero*/
  on(HeroActions.updateHero, state => ({
    ...state,
    isLoading: true
  })),
  on(HeroActions.updateHeroSuccess, (state, { hero }) => ({
    ...state,
    heroes: state.heroes.map(h => (h.id === hero.id ? hero : h)),
    isLoading: false
  })),
  on(HeroActions.updateHeroFail, (state, { error }) => ({
    ...state,
    error,
    isLoading: false
  }))
);
