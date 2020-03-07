import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { reducers } from "./index";
import { HeroService } from "./services";
import { HeroEffects } from "./effects/hero.effects";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature("entityCache", reducers),
    EffectsModule.forFeature([HeroEffects])
  ],
  providers: [HeroService],
  exports: [StoreModule, EffectsModule]
})
export class AppStoreModule {}
