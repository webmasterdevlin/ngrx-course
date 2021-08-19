import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    const token = localStorage.getItem("jwt");

    console.log("local storage: ", JSON.stringify(token));
    const jwtHelper = new JwtHelperService();
    if (token && !jwtHelper.isTokenExpired(token)) {
      return true;
    }

    this.router.navigate(["login"]).then();
    return false;
  }
}
