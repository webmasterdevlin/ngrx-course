import { Injectable } from "@angular/core";

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Villain } from "../../features/villain/villain.model";
import { catchError } from "rxjs/operators";
import { environment } from "../../../environments/environment";

@Injectable()
export class VillainService {
  path = environment.apiUrlBase + "villains";

  constructor(private http: HttpClient) {}

  getVillains(): Observable<Villain[]> {
    return this.http
      .get<Villain[]>(this.path)
      .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
  }

  deleteVillainById(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.path}/${id}`)
      .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
  }

  postVillain(createdVillain: Villain): Observable<Villain> {
    return this.http
      .post<Villain>(this.path, createdVillain)
      .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
  }

  putVillain(updatedVillain: Villain): Observable<void> {
    return this.http
      .put<void>(`${this.path}/${updatedVillain.id}`, updatedVillain)
      .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
  }

  getVillainById(id: string): Observable<Villain> {
    return this.http
      .get<Villain>(`${this.path}/${id}`)
      .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
  }
}
