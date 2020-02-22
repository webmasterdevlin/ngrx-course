import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Hero } from "./hero.model";
import { catchError } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class HeroService {
  path = environment.apiUrlBase + "heroes";

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(this.path)
      .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
  }

  deleteHeroById(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.path}/${id}`)
      .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
  }

  postHero(createdHero: Hero): Observable<Hero> {
    return this.http
      .post<Hero>(this.path, createdHero)
      .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
  }

  putHero(updatedHero: Hero): Observable<void> {
    return this.http
      .put<void>(`${this.path}/${updatedHero.id}`, updatedHero)
      .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
  }

  getHeroById(id: string): Observable<Hero> {
    return this.http
      .get<Hero>(`${this.path}/${id}`)
      .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
  }
}
