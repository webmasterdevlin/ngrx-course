import { NgModule } from "@angular/core";
import { AntiHeroesComponent } from "./containers/anti-heroes/anti-heroes.component";
import { AntiHeroDetailComponent } from "./containers/anti-hero-detail/anti-hero-detail.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";

const routes: Routes = [
  {
    path: "",
    component: AntiHeroesComponent,
  },
  {
    path: "anti-hero-detail/:id",
    component: AntiHeroDetailComponent,
  },
];

@NgModule({
  declarations: [AntiHeroesComponent, AntiHeroDetailComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class AntiHeroesModule {}
