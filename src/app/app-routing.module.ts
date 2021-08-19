import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./core/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "heroes",
    pathMatch: "full",
  },
  {
    path: "heroes",
    loadChildren: () =>
      import("./features/hero/heroes.module").then((m) => m.HeroesModule),
  },
  {
    path: "villains",
    loadChildren: () =>
      import("./features/villain/villains.module").then(
        (m) => m.VillainsModule
      ),
  },
  {
    path: "anti-heroes",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./features/anti-hero/anti-heroes.module").then(
        (m) => m.AntiHeroesModule
      ),
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./features/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "**",
    redirectTo: "",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
