import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Villain } from "src/app/features/villain/villain.model";

@Injectable()
export class VillainService {
  path = environment.apiUrlBase + "villains";

  constructor(private http: HttpClient) {}

  getVillains(): Observable<Villain[]> {
    return this.http.get<Villain[]>(this.path);
  }

  deleteVillain(id: string): Observable<void> {
    return this.http.delete<void>(`${this.path}/${id}`);
  }

  postVillain(createdVillain: Villain): Observable<Villain> {
    return this.http.post<Villain>(this.path, createdVillain);
  }

  putVillain(updatedVillain: Villain): Observable<void> {
    return this.http.put<void>(
      `${this.path}/${updatedVillain.id}`,
      updatedVillain
    );
  }
}
