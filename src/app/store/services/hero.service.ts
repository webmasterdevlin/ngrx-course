import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Hero } from "src/app/features/hero/hero.model";

@Injectable()
export class HeroService {
  path = environment.apiUrlBase + "heroes";

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.path);
  }

  deleteHero(id: string): Observable<void> {
    return this.http.delete<void>(`${this.path}/${id}`);
  }

  postHero(createdHero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.path, createdHero);
  }

  putHero(updatedHero: Hero): Observable<void> {
    return this.http.put<void>(`${this.path}/${updatedHero.id}`, updatedHero);
  }
}
