import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { VillainService } from "../services";
import { catchError, map, mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import * as villainActions from "../actions/villain.actions";

@Injectable()
export class VillainEffects {
  constructor(
    private actions$: Actions,
    private villainService: VillainService
  ) {}

  loadVillains$ = createEffect(() =>
    this.actions$.pipe(
      ofType(villainActions.loadVillains),
      mergeMap(() =>
        this.villainService.getVillains().pipe(
          map((villains) =>
            villainActions.loadVillainsSuccess({
              villains,
            })
          ),
          catchError((error) => of(villainActions.loadVillainsFail({ error })))
        )
      )
    )
  );

  deleteVillain$ = createEffect(() =>
    this.actions$.pipe(
      ofType(villainActions.deleteVillain),
      map((action) => action.id),
      mergeMap((id) =>
        this.villainService.deleteVillain(id).pipe(
          map(() => villainActions.deleteVillainSuccess({ id })),
          catchError((error) => of(villainActions.deleteVillainFail({ error })))
        )
      )
    )
  );

  createVillain$ = createEffect(() =>
    this.actions$.pipe(
      ofType(villainActions.createVillain),
      map((action) => action.villain),
      mergeMap((villain) =>
        this.villainService.postVillain(villain).pipe(
          map((res) => villainActions.createVillainSuccess({ villain: res })),
          catchError((err) =>
            of(villainActions.createVillainFail({ error: err.message }))
          )
        )
      )
    )
  );

  updateVillain$ = createEffect(() =>
    this.actions$.pipe(
      ofType(villainActions.updateVillain),
      map((action) => action.villain),
      mergeMap((villain) =>
        this.villainService.putVillain(villain).pipe(
          map(() => villainActions.updateVillainSuccess({ villain })),
          catchError((err) => of(villainActions.updateVillainFail(err.message)))
        )
      )
    )
  );
}
