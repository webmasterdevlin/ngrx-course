import { NgModule } from "@angular/core";
import { HeroService, VillainService } from "./services";

@NgModule({
  imports: [],
  providers: [HeroService, VillainService],
})
export class AppStoreModule {}
