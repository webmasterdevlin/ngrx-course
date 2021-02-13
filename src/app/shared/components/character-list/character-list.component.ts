import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Hero } from "src/app/features/hero/hero.model";
import { Villain } from "src/app/features/villain/villain.model";
import { selectHeroStore, selectVillainStore, State } from "src/app/store";

@UntilDestroy()
@Component({
  selector: "app-character-list",
  templateUrl: "./character-list.component.html",
  styleUrls: ["./character-list.component.css"],
})
export class CharacterListComponent implements OnInit {
  heroes: Hero[];
  villains: Villain[];

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
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
}
