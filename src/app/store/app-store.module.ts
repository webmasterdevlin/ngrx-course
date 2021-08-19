import { NgModule } from "@angular/core";
import { HeroService, VillainService, AntiHeroService } from "./services";

@NgModule({
  imports: [],
  providers: [HeroService, VillainService, AntiHeroService],
})
export class AppStoreModule {}
