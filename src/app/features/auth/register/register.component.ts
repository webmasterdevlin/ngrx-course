import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { User } from "../user.model";
import { catchError, map } from "rxjs/operators";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  invalidRegister: boolean;
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formBuilderInit();
  }

  formBuilderInit(): void {
    this.registerForm = this.fb.group({
      email: [""],
      mobileNumber: [""],
      password: [""],
    });
  }

  onSubmit(): void {
    // You can validate all your fields here before sending loginForm
    this.sendLoginForm();
  }

  private sendLoginForm(): void {
    const user = <User>this.registerForm.value;

    this.userService
      .register(user)
      .pipe(
        untilDestroyed(this),
        map(async (response) => {
          await this.router.navigate(["auth/login"]);
        }),
        catchError((err) => {
          console.log(err);
          return err;
        })
      )
      .subscribe();
  }
}
