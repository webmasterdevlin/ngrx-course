import { createReducer, on } from "@ngrx/store";
import * as VillainActions from "../actions/villain.actions";
import { Villain } from "src/app/features/villain/villain.model";

export interface VillainState {
  villains: Villain[];
  isLoading: boolean;
  error: string;
}

export const initialState: VillainState = {
  villains: [],
  isLoading: false,
  error: "",
};

export const villainReducer = createReducer(
  initialState,

  /*loads the list of villains*/
  on(VillainActions.loadVillains, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(VillainActions.loadVillainsSuccess, (state, { villains }) => ({
    ...state,
    villains,
    isLoading: false,
  })),
  on(VillainActions.loadVillainsFail, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  /*deletes a villain*/
  on(VillainActions.deleteVillain, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(VillainActions.deleteVillainSuccess, (state, { id }) => ({
    ...state,
    villains: state.villains.filter((h) => h.id !== id),
    isLoading: false,
  })),
  on(VillainActions.deleteVillainFail, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  /*creates a villain*/
  on(VillainActions.createVillain, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(VillainActions.createVillainSuccess, (state, { villain }) => ({
    ...state,
    villains: [...state.villains, villain],
    isLoading: false,
  })),
  on(VillainActions.createVillainFail, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  /*updates a villain*/
  on(VillainActions.updateVillain, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(VillainActions.updateVillainSuccess, (state, { villain }) => ({
    ...state,
    villains: state.villains.map((h) => (h.id === villain.id ? villain : h)),
    isLoading: false,
  })),
  on(VillainActions.updateVillainFail, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  on(VillainActions.softDeleteVillain, (state, { id }) => ({
    ...state,
    villains: state.villains.filter((h) => h.id !== id),
  }))
);
