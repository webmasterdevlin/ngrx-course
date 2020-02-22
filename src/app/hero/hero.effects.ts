import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HeroService } from "./hero.service";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import * as heroActions from "./hero.actions";

@Injectable()
export class HeroEffects {
  constructor(private actions$: Actions, private heroService: HeroService) {}

  loadHeroes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(heroActions.loadHeroes),
      tap(val => console.log("loadHeroes$ BEFORE MAP:", val)),
      mergeMap(() =>
        this.heroService.getHeroes().pipe(
          map(heroes =>
            heroActions.loadHeroesSuccess({
              heroes
            })
          ),
          catchError(error => of(heroActions.loadHeroesFail({ error })))
        )
      ),
      tap(val => console.log("loadHeroes$ AFTER MAP:", val))
    )
  );

  deleteHero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(heroActions.deleteHero),
      tap(val => console.log("deleteHero$ BEFORE MAP:", val)),
      map(action => action.id),
      mergeMap(id =>
        this.heroService.deleteHeroById(id).pipe(
          map(() => heroActions.deleteHeroSuccess({ id })),
          catchError(error => of(heroActions.deleteHeroFail({ error })))
        )
      ),
      tap(val => console.log("deleteHero$ AFTER MAP:", val))
    )
  );

  createHero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(heroActions.createHero),
      map(action => action.hero),
      mergeMap(hero =>
        this.heroService.postHero(hero).pipe(
          map(hero => heroActions.createHeroSuccess({ hero })),
          catchError(err =>
            of(heroActions.createHeroFail({ error: err.message }))
          )
        )
      )
    )
  );

  updateHero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(heroActions.updateHero),
      map(action => action.hero),
      mergeMap(hero =>
        this.heroService.putHero(hero).pipe(
          map(() => heroActions.updateHeroSuccess({ hero })),
          catchError(err => of(heroActions.updateHeroFail(err.message)))
        )
      )
    )
  );
}
