import { jest } from "@jest/globals";
import { TestBed } from "@angular/core/testing";
import { Actions } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { HeroService } from "../services";
import { HeroEffects } from "./hero.effects";
import { Hero } from "../../features/hero/hero.model";
import * as heroActions from "../actions/hero.actions";
import { cold, hot } from "jasmine-marbles";

describe("HeroEffects", () => {
  let effects: HeroEffects;
  let heroService: any;
  let actions$ = new Observable<Action>();

  const hero = {
    id: "1",
    firstName: "Barry",
    lastName: "Allen",
    house: "DC",
    knownAs: "Flash",
  } as Hero;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroEffects,
        {
          provide: HeroService,
          useValue: { getHeroes: jest.fn() },
        },
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(HeroEffects);
    heroService = TestBed.inject(HeroService);
    actions$ = TestBed.inject(Actions);
  });

  describe("loadHeroes$", () => {
    it("should return a heroActions.loadHeroesSuccess", () => {
      const heroes = [hero];
      const action = heroActions.loadHeroes();
      const completion = heroActions.loadHeroesSuccess({ heroes });

      actions$ = hot("-a---", { a: action });
      const response = cold("-a|", { a: heroes });
      const expected = cold("--c", { c: completion });
      heroService.getHeroes = jest.fn(() => response);

      expect(effects.loadHeroes$).toBeObservable(expected);
    });
  });

  describe("deleteHero$", () => {
    it("should return a heroActions.deleteHeroSuccess", () => {
      const action = heroActions.deleteHero({ id: hero.id });
      const completion = heroActions.deleteHeroSuccess({ id: hero.id });

      actions$ = hot("-a", { a: action });
      const response = cold("-b|", { b: null });
      const expected = cold("--c", { c: completion });
      heroService.deleteHero = jest.fn(() => response);

      expect(effects.deleteHero$).toBeObservable(expected);
      expect(heroService.deleteHero).toHaveBeenCalledWith(hero.id);
    });

    it("should return a heroActions.deleteHeroFail", () => {
      const action = heroActions.deleteHero({ id: hero.id });
      const completion = heroActions.deleteHeroFail({ error: "failed" });
      const error = "failed";

      actions$ = hot("-a", { a: action });
      const response = cold("-#", {}, error);
      const expected = cold("--c", { c: completion });
      heroService.deleteHero = jest.fn(() => response);

      expect(effects.deleteHero$).toBeObservable(expected);
      expect(heroService.deleteHero).toHaveBeenCalledWith(hero.id);
    });
  });

  describe("addHero$", () => {
    it("should return a heroActions.addHeroSuccess", () => {
      const action = heroActions.createHero({ hero: hero });
      const completion = heroActions.createHeroSuccess({ hero: hero });

      actions$ = hot("-a", { a: action });
      const response = cold("-b|", { b: hero });
      const expected = cold("--c", { c: completion });
      heroService.postHero = jest.fn(() => response);

      expect(effects.createHero$).toBeObservable(expected);
      expect(heroService.postHero).toHaveBeenCalledWith(hero);
    });
  });
});
