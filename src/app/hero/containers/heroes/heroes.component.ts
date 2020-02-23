import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectHeroStore, State } from "../../../reducers";
import {
  createHero,
  deleteHero,
  loadHeroes,
  updateHero
} from "../../hero.actions";
import { Subscription } from "rxjs";
import { Hero } from "../../hero.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"]
})
export class HeroesComponent implements OnInit, OnDestroy {
  heroes: Hero[];
  itemForm: FormGroup;
  editedForm: FormGroup;
  sub: Subscription;
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
    this.store.dispatch(loadHeroes());
    this.sub = this.store
      .select(selectHeroStore)
      .subscribe(({ heroes, isLoading, error }) => {
        this.heroes = heroes;
        this.isLoading = isLoading;
        this.error = error;
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
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
