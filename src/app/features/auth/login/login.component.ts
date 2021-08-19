import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Login } from "../user.model";
import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { catchError, map, tap } from "rxjs/operators";
import { store } from "../../../shared/helpers/jwtCache";

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
      email: ["johndoe@gmail.com"],
      password: ["Pass123!"],
    });
  }

  onSubmit(): void {
    // You can validate all your fields here before sending loginForm
    this.sendLoginForm();
  }

  private sendLoginForm(): void {
    const loginModel = <Login>this.loginForm.value;

    this.userService
      .login(loginModel)
      .pipe(
        map((response) => {
          console.log("MAP");
          const token = (<any>response).token;

          console.log("new token: ", JSON.stringify(token));

          localStorage.setItem("jwt", token);
          store(token);
          console.log("token has been stored locally");

          this.invalidLogin = false;
          this.router.navigate(["/anti-heroes"]);
        }),
        catchError((err) => {
          console.log(err);
          return err;
        })
      )
      .subscribe();
  }
}
