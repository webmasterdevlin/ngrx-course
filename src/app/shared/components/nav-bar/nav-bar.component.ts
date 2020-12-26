import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectHeroesState, selectVillainsState, State } from "../../../store";
import { untilDestroyed } from "ngx-take-until-destroy";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"],
})
export class NavBarComponent implements OnInit {
  totalHeroes = 0;
  totalVillains = 0;
  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.getStore();
  }

  // this is needed in untilDestroyed
  ngOnDestroy(): void {}

  getStore() {
    this.store
      .select(selectHeroesState)
      .pipe(untilDestroyed(this))
      .subscribe(({ heroes }) => {
        this.totalHeroes = heroes.length;
      });

    this.store
      .select(selectVillainsState)
      .pipe(untilDestroyed(this))
      .subscribe(({ villains }) => {
        this.totalVillains = villains.length;
      });
  }
}
