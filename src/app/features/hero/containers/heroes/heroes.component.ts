import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Store } from "@ngrx/store";
import { Hero } from "../../hero.model";
import { State } from "src/app/store";
import { selectHeroStore } from "src/app/store/selectors/hero.selectors";
import {
  loadHeroes,
  deleteHero,
  createHero,
  updateHero,
  softDeleteHero,
} from "src/app/store/actions/hero.actions";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  itemForm: FormGroup;
  editedForm: FormGroup;
  isLoading = false;
  editingTracker = "0";

  constructor(
    private store: Store<State>,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formBuilderInit();
    this.fetchHeroes();
  }

  handleDeleteHero(id: string) {
    this.store.dispatch(deleteHero({ id }));
  }

  handleCreateHero() {
    this.store.dispatch(createHero({ hero: this.itemForm.value }));
  }

  handleUpdateHero() {
    this.store.dispatch(updateHero({ hero: this.editedForm.value }));
  }

  handleSoftDeleteHero(id: string) {
    this.store.dispatch(softDeleteHero({ id }));
  }

  handleNavigateHeroDetail(id: string) {
    this.router.navigateByUrl("/heroes/hero-detail/" + id);
  }

  private fetchHeroes() {
    this.store.dispatch(loadHeroes());
    this.store
      .select(selectHeroStore)
      .pipe(untilDestroyed(this))
      .subscribe(({ heroes, isLoading }) => {
        this.heroes = heroes;
        this.isLoading = isLoading;
      });
  }

  private formBuilderInit(): void {
    this.itemForm = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(4)]],
      lastName: ["", [Validators.required, Validators.minLength(4)]],
      house: [""],
      knownAs: [""],
    });

    this.editedForm = this.fb.group({
      id: [""],
      firstName: ["", [Validators.required, Validators.minLength(4)]],
      lastName: ["", [Validators.required, Validators.minLength(4)]],
      house: [""],
      knownAs: [""],
    });
  }
}
