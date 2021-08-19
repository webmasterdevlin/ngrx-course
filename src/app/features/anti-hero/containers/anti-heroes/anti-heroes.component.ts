import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Store } from "@ngrx/store";
import { AntiHero } from "../../anti-hero.model";
import { State } from "src/app/store";
import { selectAntiHeroStore } from "src/app/store/selectors/anti-hero.selectors";
import {
  loadAntiHeroes,
  deleteAntiHero,
  createAntiHero,
  updateAntiHero,
  softDeleteAntiHero,
} from "src/app/store/actions/anti-hero.actions";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: "app-anti-heroes",
  templateUrl: "./anti-heroes.component.html",
  styleUrls: ["./anti-heroes.component.css"],
})
export class AntiHeroesComponent implements OnInit {
  antiHeroes: AntiHero[];
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
    this.fetchAntiHeroes();
  }

  handleDeleteAntiHero(id: string) {
    this.store.dispatch(deleteAntiHero({ id }));
  }

  handleCreateAntiHero() {
    this.store.dispatch(createAntiHero({ antiHero: this.itemForm.value }));
  }

  handleUpdateAntiHero() {
    this.store.dispatch(updateAntiHero({ antiHero: this.editedForm.value }));
  }

  handleSoftDeleteAntiHero(id: string) {
    this.store.dispatch(softDeleteAntiHero({ id }));
  }

  handleNavigateAntiHeroDetail(id: string) {
    this.router.navigateByUrl("/anti-heroes/anti-hero-detail/" + id);
  }

  private fetchAntiHeroes() {
    this.store.dispatch(loadAntiHeroes());
    this.store
      .select(selectAntiHeroStore)
      .pipe(untilDestroyed(this))
      .subscribe(({ antiHeroes, isLoading }) => {
        this.antiHeroes = antiHeroes;
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
