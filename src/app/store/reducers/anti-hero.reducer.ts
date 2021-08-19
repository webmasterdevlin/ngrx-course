import { createReducer, on } from "@ngrx/store";
import * as AntiHeroActions from "../actions/anti-hero.actions";
import { AntiHero } from "src/app/features/anti-hero/anti-hero.model";

export interface AntiHeroState {
  antiHeroes: AntiHero[];
  isLoading: boolean;
  error: string;
}

export const initialState: AntiHeroState = {
  antiHeroes: [],
  isLoading: false,
  error: "",
};

export const antiHeroReducer = createReducer(
  initialState,

  /*loads the list of antiHeroes*/
  on(AntiHeroActions.loadAntiHeroes, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(AntiHeroActions.loadAntiHeroesSuccess, (state, { antiHeroes }) => ({
    ...state,
    antiHeroes,
    isLoading: false,
  })),
  on(AntiHeroActions.loadAntiHeroesFail, (state, { error }) => ({
    ...state,
    antiHeroes: [],
    error,
    isLoading: false,
  })),

  /*deletes a antiHero*/
  on(AntiHeroActions.deleteAntiHero, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(AntiHeroActions.deleteAntiHeroSuccess, (state, { id }) => ({
    ...state,
    antiHeroes: state.antiHeroes.filter((h) => h.id !== id),
    isLoading: false,
  })),
  on(AntiHeroActions.deleteAntiHeroFail, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  /*creates a antiHero*/
  on(AntiHeroActions.createAntiHero, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(AntiHeroActions.createAntiHeroSuccess, (state, { antiHero }) => ({
    ...state,
    antiHeroes: [...state.antiHeroes, antiHero],
    isLoading: false,
  })),
  on(AntiHeroActions.createAntiHeroFail, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  /*updates a antiHero*/
  on(AntiHeroActions.updateAntiHero, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(AntiHeroActions.updateAntiHeroSuccess, (state, { antiHero }) => ({
    ...state,
    antiHeroes: state.antiHeroes.map((h) =>
      h.id === antiHero.id ? antiHero : h
    ),
    isLoading: false,
  })),
  on(AntiHeroActions.updateAntiHeroFail, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  on(AntiHeroActions.softDeleteAntiHero, (state, { id }) => ({
    ...state,
    antiHeroes: state.antiHeroes.filter((h) => h.id !== id),
  }))
);
