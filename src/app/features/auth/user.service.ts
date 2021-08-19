import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { Login, User } from "./user.model";

@Injectable()
export class UserService {
  path = environment.apiUrlBase;

  constructor(private http: HttpClient) {}

  login(login: Login): Observable<any> {
    return this.http.post<Login>(`${this.path}authenticate`, login, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  register(user: User): Observable<any> {
    return this.http.post<User>(`${this.path}register`, user, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }
}
