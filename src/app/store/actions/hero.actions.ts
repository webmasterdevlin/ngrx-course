import { createAction, props } from "@ngrx/store";
import { Hero } from "src/app/features/hero/hero.model";

export const loadHeroes = createAction("[Hero] loadHeroes");

export const loadHeroesSuccess = createAction(
  "[Hero] loadHeroesSuccess",
  props<{ heroes: Hero[] }>()
);

export const loadHeroesFail = createAction(
  "[Hero] loadHeroesFail",
  props<{ error: string }>()
);

export const deleteHero = createAction(
  "[Hero] deleteHero",
  props<{ id: string }>()
);

export const deleteHeroSuccess = createAction(
  "[Hero] deleteHeroSuccess",
  props<{ id: string }>()
);

export const deleteHeroFail = createAction(
  "[Hero] deleteHeroFail",
  props<{ error: string }>()
);

export const createHero = createAction(
  "[Hero] createHero",
  props<{ hero: Hero }>()
);

export const createHeroSuccess = createAction(
  "[Hero] createHeroSuccess",
  props<{ hero: Hero }>()
);

export const createHeroFail = createAction(
  "[Hero] createHeroFail",
  props<{ error: string }>()
);

export const updateHero = createAction(
  "[Hero] updateHero",
  props<{ hero: Hero }>()
);

export const updateHeroSuccess = createAction(
  "[Hero] updateHeroSuccess",
  props<{ hero: Hero }>()
);

export const updateHeroFail = createAction(
  "[Hero] updateHeroFail",
  props<{ error: string }>()
);

export const softDeleteHero = createAction(
  "[Hero] softDeleteHero",
  props<{ id: string }>()
);
