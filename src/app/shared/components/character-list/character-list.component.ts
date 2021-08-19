import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Hero } from "src/app/features/hero/hero.model";
import { Villain } from "src/app/features/villain/villain.model";
import { AntiHero } from "../../../features/anti-hero/anti-hero.model";
import { State } from "src/app/store";
import { selectHeroStore } from "src/app/store/selectors/hero.selectors";
import { selectVillainStore } from "src/app/store/selectors/villain.selectors";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { selectAntiHeroStore } from "../../../store/selectors/anti-hero.selectors";

@UntilDestroy()
@Component({
  selector: "app-character-list",
  templateUrl: "./character-list.component.html",
  styleUrls: ["./character-list.component.css"],
})
export class CharacterListComponent implements OnInit {
  heroes: Hero[];
  villains: Villain[];
  antiHeroes: AntiHero[];

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.fetchHeroes();
    this.fetchVillains();
    this.fetchAntiHeroes();
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

  fetchAntiHeroes() {
    this.store
      .select(selectAntiHeroStore)
      .pipe(untilDestroyed(this))
      .subscribe(({ antiHeroes }) => {
        this.antiHeroes = antiHeroes;
      });
  }
}
