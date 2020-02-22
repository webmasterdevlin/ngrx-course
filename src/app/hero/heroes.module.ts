import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeroDetailComponent} from './containers/hero-detail/hero-detail.component';
import {HeroesComponent} from './containers/heroes/heroes.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: HeroesComponent
  },
  {
    path: "hero-detail/:id",
    component: HeroDetailComponent
  }
];

@NgModule({
  declarations: [HeroDetailComponent, HeroesComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes),
  ]
})
export class HeroesModule { }
