import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { untilDestroyed } from "ngx-take-until-destroy";
import {
  createHero,
  deleteHero,
  loadHeroes,
  updateHero
} from "../../../../store/actions/hero.actions";
import { Hero } from "../../hero.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { selectHeroStore, State } from "../../../../store";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"]
})
export class HeroesComponent implements OnInit, OnDestroy {
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

  // this is needed in untilDestroyed
  ngOnDestroy(): void {}

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

  removeHero(id: string) {
    this.store.dispatch(deleteHero({ id }));
  }

  onSave() {
    // stop here if form is invalid
    if (this.itemForm.invalid) {
      return;
    }

    this.store.dispatch(createHero({ hero: this.itemForm.value }));

    this.itemForm.reset();
  }

  onUpdate() {
    // stop here if form is invalid
    if (this.editedForm.invalid) {
      return;
    }

    this.store.dispatch(updateHero({ hero: this.editedForm.value }));
  }

  goToHeroDetail(id: string) {
    this.router.navigateByUrl("/heroes/hero-detail/" + id);
  }

  private formBuilderInit(): void {
    this.itemForm = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(4)]],
      lastName: ["", [Validators.required, Validators.minLength(4)]],
      house: [""],
      knownAs: [""]
    });

    this.editedForm = this.fb.group({
      id: [""],
      firstName: ["", [Validators.required, Validators.minLength(4)]],
      lastName: ["", [Validators.required, Validators.minLength(4)]],
      house: [""],
      knownAs: [""]
    });
  }
}
