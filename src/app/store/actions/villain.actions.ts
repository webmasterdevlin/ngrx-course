import { createAction, props } from "@ngrx/store";
import { Villain } from "src/app/features/villain/villain.model";

export const loadVillains = createAction("[Villain] loadVillains");

export const loadVillainsSuccess = createAction(
  "[Villain] loadVillainsSuccess",
  props<{ villains: Villain[] }>()
);

export const loadVillainsFail = createAction(
  "[Villain] loadVillainsFail",
  props<{ error: string }>()
);

export const deleteVillain = createAction(
  "[Villain] deleteVillain",
  props<{ id: string }>()
);

export const deleteVillainSuccess = createAction(
  "[Villain] deleteVillainSuccess",
  props<{ id: string }>()
);

export const deleteVillainFail = createAction(
  "[Villain] deleteVillainFail",
  props<{ error: string }>()
);

export const createVillain = createAction(
  "[Villain] createVillain",
  props<{ villain: Villain }>()
);

export const createVillainSuccess = createAction(
  "[Villain] createVillainSuccess",
  props<{ villain: Villain }>()
);

export const createVillainFail = createAction(
  "[Villain] createVillainFail",
  props<{ error: string }>()
);

export const updateVillain = createAction(
  "[Villain] updateVillain",
  props<{ villain: Villain }>()
);

export const updateVillainSuccess = createAction(
  "[Villain] updateVillainSuccess",
  props<{ villain: Villain }>()
);

export const updateVillainFail = createAction(
  "[Villain] updateVillainFail",
  props<{ error: string }>()
);

export const softDeleteVillain = createAction(
  "[Villain] softDeleteVillain",
  props<{ id: string }>()
);
