import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HeroService } from "../services";
import { catchError, map, mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import * as heroActions from "../actions/hero.actions";

@Injectable()
export class HeroEffects {
  constructor(private actions$: Actions, private heroService: HeroService) {}

  loadHeroes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(heroActions.loadHeroes),
      mergeMap(() =>
        this.heroService.getHeroes().pipe(
          map((heroes) =>
            heroActions.loadHeroesSuccess({
              heroes,
            })
          ),
          catchError((error) => of(heroActions.loadHeroesFail({ error })))
        )
      )
    )
  );

  deleteHero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(heroActions.deleteHero),
      map((action) => action.id),
      mergeMap((id) =>
        this.heroService.deleteHero(id).pipe(
          map(() => heroActions.deleteHeroSuccess({ id })),
          catchError((error) => of(heroActions.deleteHeroFail({ error })))
        )
      )
    )
  );

  createHero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(heroActions.createHero),
      map((action) => action.hero),
      mergeMap((hero) =>
        this.heroService.postHero(hero).pipe(
          map((res) => heroActions.createHeroSuccess({ hero: res })),
          catchError((err) =>
            of(heroActions.createHeroFail({ error: err.message }))
          )
        )
      )
    )
  );

  updateHero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(heroActions.updateHero),
      map((action) => action.hero),
      mergeMap((hero) =>
        this.heroService.putHero(hero).pipe(
          map(() => heroActions.updateHeroSuccess({ hero })),
          catchError((err) => of(heroActions.updateHeroFail(err.message)))
        )
      )
    )
  );
}
