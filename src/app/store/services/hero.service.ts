import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Hero } from "../../features/hero/hero.model";

@Injectable()
export class HeroService {
  path = environment.apiUrlBase + "heroes";

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.path);
  }

  deleteHero(id: string): Observable<void> {
    return this.http.delete<void>(`${this.path}/${id}gjgjhg`);
  }

  postHero(createdHero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.path, createdHero);
  }

  putHero(updatedHero: Hero): Observable<void> {
    return this.http.put<void>(`${this.path}/${updatedHero.id}`, updatedHero);
  }
}
