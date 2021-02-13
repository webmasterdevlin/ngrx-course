import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Hero } from "../../hero.model";
import { selectHeroStore, State } from "src/app/store";
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
  error = "";
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

  fetchHeroes() {
    this.store.dispatch(loadHeroes());
    this.store
      .select(selectHeroStore)
      .pipe(untilDestroyed(this))
      .subscribe(({ heroes, isLoading, error }) => {
        this.heroes = heroes;
        this.isLoading = isLoading;
        this.error = error;
      });
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

  handleNavigateHeroDetail(id: string) {
    this.router.navigateByUrl("/heroes/hero-detail/" + id);
  }

  handleSoftDeleteHero(id: string) {
    this.store.dispatch(softDeleteHero({ id }));
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
