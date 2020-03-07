import { EntityState } from "@ngrx/entity";

export interface Hero {
  id: string;
  firstName: string;
  lastName: string;
  house: string;
  knownAs: string;
}

export interface HeroState extends EntityState<Hero> {}
