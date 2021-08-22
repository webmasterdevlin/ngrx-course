import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { catchError, map, mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import * as antiHeroActions from "../actions/anti-hero.actions";
import { AntiHeroService } from "../services";

@Injectable()
export class AntiHeroEffects {
  constructor(
    private actions$: Actions,
    private antiHeroService: AntiHeroService
  ) {}

  loadAntiHeroes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(antiHeroActions.loadAntiHeroes),
      mergeMap(() =>
        this.antiHeroService.getAntiHeroes().pipe(
          map((antiHeroes) =>
            antiHeroActions.loadAntiHeroesSuccess({
              antiHeroes,
            })
          ),
          catchError((error) => {
            console.log(error);
            return of(antiHeroActions.loadAntiHeroesFail({ error }));
          })
        )
      )
    )
  );

  deleteAntiHero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(antiHeroActions.deleteAntiHero),
      map((action) => action.id),
      mergeMap((id) =>
        this.antiHeroService.deleteAntiHero(id).pipe(
          map(() => antiHeroActions.deleteAntiHeroSuccess({ id })),
          catchError((error) =>
            of(antiHeroActions.deleteAntiHeroFail({ error }))
          )
        )
      )
    )
  );

  createAntiHero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(antiHeroActions.createAntiHero),
      map((action) => action.antiHero),
      mergeMap((antiHero) =>
        this.antiHeroService.postAntiHero(antiHero).pipe(
          map((res) =>
            antiHeroActions.createAntiHeroSuccess({ antiHero: res })
          ),
          catchError((err) =>
            of(antiHeroActions.createAntiHeroFail({ error: err.message }))
          )
        )
      )
    )
  );

  updateAntiHero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(antiHeroActions.updateAntiHero),
      map((action) => action.antiHero),
      mergeMap((antiHero) =>
        this.antiHeroService.putAntiHero(antiHero).pipe(
          map(() => antiHeroActions.updateAntiHeroSuccess({ antiHero })),
          catchError((err) =>
            of(antiHeroActions.updateAntiHeroFail(err.message))
          )
        )
      )
    )
  );
}
