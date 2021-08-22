import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "src/app/store";
import { loadHeroes } from "src/app/store/actions/hero.actions";
import { selectHeroStore } from "src/app/store/selectors/hero.selectors";
import { loadVillains } from "src/app/store/actions/villain.actions";
import { selectVillainStore } from "src/app/store/selectors/villain.selectors";
import { loadAntiHeroes } from "src/app/store/actions/anti-hero.actions";
import { selectAntiHeroStore } from "src/app/store/selectors/anti-hero.selectors";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { getJwt, removeJwt } from "../../helpers/jwtCache";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";

@UntilDestroy()
@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"],
})
export class NavBarComponent implements OnInit {
  totalHeroes = 0;
  totalVillains = 0;
  totalAntiHeroes = 0;

  isLogged = false;

  constructor(private store: Store<State>, private router: Router) {}

  ngOnInit(): void {
    this.getStore();

    const token = getJwt();
    const jwtHelper = new JwtHelperService();
    if (token && !jwtHelper.isTokenExpired(token)) {
      this.isLogged = true;
    }
  }

  handleLoadCharacters() {
    this.store.dispatch(loadHeroes());
    this.store.dispatch(loadVillains());
    this.store.dispatch(loadAntiHeroes());
  }

  async logout() {
    removeJwt();
    await this.router.navigateByUrl("/auth/login");
  }

  private getStore() {
    this.store
      .select(selectHeroStore)
      .pipe(untilDestroyed(this))
      .subscribe(({ heroes }) => {
        this.totalHeroes = heroes.length;
      });

    this.store
      .select(selectVillainStore)
      .pipe(untilDestroyed(this))
      .subscribe(({ villains }) => {
        this.totalVillains = villains.length;
      });

    this.store
      .select(selectAntiHeroStore)
      .pipe(untilDestroyed(this))
      .subscribe(({ antiHeroes }) => {
        this.totalAntiHeroes = antiHeroes.length;
      });
  }
}
