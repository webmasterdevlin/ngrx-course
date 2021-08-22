import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Login } from "../user.model";
import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { catchError, map } from "rxjs/operators";
import { storeJwt } from "src/app/shared/helpers/jwtCache";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formBuilderInit();
  }

  formBuilderInit(): void {
    this.loginForm = this.fb.group({
      email: [""],
      password: [""],
    });
  }

  onSubmit(): void {
    // You can validate all your fields here before sending loginForm
    this.sendLoginForm();
  }

  private sendLoginForm(): void {
    const login = <Login>this.loginForm.value;

    this.userService
      .login(login)
      .pipe(
        untilDestroyed(this),
        map(async (response) => {
          const token = (<any>response).token;
          storeJwt(token);
          this.invalidLogin = false;
          await this.router.navigate(["/anti-heroes"]);
        }),
        catchError((err) => {
          console.log(err);
          return err;
        })
      )
      .subscribe();
  }
}
