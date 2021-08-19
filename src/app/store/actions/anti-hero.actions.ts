import { createAction, props } from "@ngrx/store";
import { AntiHero } from "src/app/features/anti-hero/anti-hero.model";

export const loadAntiHeroes = createAction("[AntiHero] loadAntiHeroes");

export const loadAntiHeroesSuccess = createAction(
  "[AntiHero] loadAntiHeroesSuccess",
  props<{ antiHeroes: AntiHero[] }>()
);

export const loadAntiHeroesFail = createAction(
  "[AntiHero] loadAntiHeroesFail",
  props<{ error: string }>()
);

export const deleteAntiHero = createAction(
  "[AntiHero] deleteAntiHero",
  props<{ id: string }>()
);

export const deleteAntiHeroSuccess = createAction(
  "[AntiHero] deleteAntiHeroSuccess",
  props<{ id: string }>()
);

export const deleteAntiHeroFail = createAction(
  "[AntiHero] deleteAntiHeroFail",
  props<{ error: string }>()
);

export const createAntiHero = createAction(
  "[AntiHero] createAntiHero",
  props<{ antiHero: AntiHero }>()
);

export const createAntiHeroSuccess = createAction(
  "[AntiHero] createAntiHeroSuccess",
  props<{ antiHero: AntiHero }>()
);

export const createAntiHeroFail = createAction(
  "[AntiHero] createAntiHeroFail",
  props<{ error: string }>()
);

export const updateAntiHero = createAction(
  "[AntiHero] updateAntiHero",
  props<{ antiHero: AntiHero }>()
);

export const updateAntiHeroSuccess = createAction(
  "[AntiHero] updateAntiHeroSuccess",
  props<{ antiHero: AntiHero }>()
);

export const updateAntiHeroFail = createAction(
  "[AntiHero] updateAntiHeroFail",
  props<{ error: string }>()
);

export const softDeleteAntiHero = createAction(
  "[AntiHero] softDeleteAntiHero",
  props<{ id: string }>()
);
