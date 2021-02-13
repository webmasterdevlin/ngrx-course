import { Component, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { untilDestroyed } from "ngx-take-until-destroy";
import { Hero } from "src/app/features/hero/hero.model";
import { Villain } from "src/app/features/villain/villain.model";
import { selectHeroStore, selectVillainStore, State } from "../../../store";

@Component({
  selector: "app-character-list",
  templateUrl: "./character-list.component.html",
  styleUrls: ["./character-list.component.css"],
})
export class CharacterListComponent implements OnDestroy {
  heroes: Hero[];
  villains: Villain[];

  constructor(private store: Store<State>) {
    this.fetchHeroes();
    this.fetchVillains();
  }

  fetchHeroes() {
    this.store
      .select(selectHeroStore)
      .pipe(untilDestroyed(this))
      .subscribe(({ heroes }) => {
        this.heroes = heroes;
      });
  }

  fetchVillains() {
    this.store
      .select(selectVillainStore)
      .pipe(untilDestroyed(this))
      .subscribe(({ villains }) => {
        this.villains = villains;
      });
  }

  // this is needed in untilDestroyed
  ngOnDestroy(): void {}
}
