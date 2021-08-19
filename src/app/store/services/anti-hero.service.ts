import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AntiHero } from "src/app/features/anti-hero/anti-hero.model";
import { AuthBearerAndContentTypeJsonHeaders } from "../../shared/helpers/httpHeaders";

@Injectable()
export class AntiHeroService {
  path = environment.apiUrlBase + "api/v1/anti-heroes";

  constructor(private http: HttpClient) {}

  getAntiHeroes(): Observable<AntiHero[]> {
    return this.http.get<AntiHero[]>(
      this.path,
      AuthBearerAndContentTypeJsonHeaders.options
    );
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
