import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { Login, User } from "../user.model";
import { catchError, map } from "rxjs/operators";
import { store } from "../../../shared/helpers/jwtCache";

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
    const userModel = <User>this.registerForm.value;

    this.userService.register(userModel).pipe(
      map(async (response) => {
        console.log(response);
      }),
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }
}
