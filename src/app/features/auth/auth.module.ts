import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SharedModule } from "../../shared/shared.module";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { UserService } from "./user.service";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [UserService],
})
export class AuthModule {}
