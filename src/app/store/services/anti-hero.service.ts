import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AntiHero } from "src/app/features/anti-hero/anti-hero.model";

@Injectable()
export class AntiHeroService {
  path = environment.apiUrlBase + "anti-heroes";

  constructor(private http: HttpClient) {}

  getAntiHeroes(): Observable<AntiHero[]> {
    return this.http.get<AntiHero[]>(this.path);
  }

  deleteAntiHero(id: string): Observable<void> {
    return this.http.delete<void>(`${this.path}/${id}`);
  }

  postAntiHero(createdAntiHero: AntiHero): Observable<AntiHero> {
    return this.http.post<AntiHero>(this.path, createdAntiHero);
  }

  putAntiHero(updatedAntiHero: AntiHero): Observable<void> {
    return this.http.put<void>(
      `${this.path}/${updatedAntiHero.id}`,
      updatedAntiHero
    );
  }
}
