import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from "@ngrx/store";
import { reducers, metaReducers } from "./reducers";
import { SharedMaterialModule } from "./shared/shared-material.module";
import { NavBarComponent } from "./shared/components/nav-bar/nav-bar.component";
import { RouterState, StoreRouterConnectingModule } from "@ngrx/router-store";
import { EffectsModule } from "@ngrx/effects";
import { HeroEffects } from "./hero/hero.effects";
import { environment } from "../environments/environment";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, NavBarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedMaterialModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictActionImmutability: true,
        strictActionSerializability: true,
        strictStateImmutability: true,
        strictStateSerializability: true
      }
    }),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal
    }),
    EffectsModule.forRoot([HeroEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
