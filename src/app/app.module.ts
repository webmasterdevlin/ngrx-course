import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActionReducer, MetaReducer, StoreModule } from "@ngrx/store";

import { NavBarComponent } from "./shared/components/nav-bar/nav-bar.component";
import { RouterState, StoreRouterConnectingModule } from "@ngrx/router-store";
import { EffectsModule } from "@ngrx/effects";
import { environment } from "../environments/environment";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { storeLogger } from "ngrx-store-logger";
import { SharedModule } from "./shared/shared.module";
import { reducers, State } from "./store";
import { CoreModule } from "./core/core.module";
import { AppStoreModule } from "./store/app-store.module";
import { HeroEffects } from "./store/effects/hero.effects";

export function logger(reducer: ActionReducer<State>): any {
  return storeLogger()(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];

@NgModule({
  declarations: [AppComponent, NavBarComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    AppStoreModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal
    }),
    EffectsModule.forRoot([HeroEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
