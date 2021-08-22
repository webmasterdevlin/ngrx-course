import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { getJwt } from "../shared/helpers/jwtCache";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    const token = getJwt();
    const jwtHelper = new JwtHelperService();
    if (token && !jwtHelper.isTokenExpired(token)) {
      return true;
    }

    this.router.navigate(["auth/login"]).then();
    return false;
  }
}
