import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { untilDestroyed } from "ngx-take-until-destroy";
import {
  createVillain,
  deleteVillain,
  loadVillains,
  updateVillain,
} from "../../../../store/actions/villain.actions";
import { Villain } from "../../villain.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { selectVillainStore, State } from "../../../../store";

@Component({
  selector: "app-villains",
  templateUrl: "./villains.component.html",
  styleUrls: ["./villains.component.css"],
})
export class VillainsComponent implements OnInit, OnDestroy {
  villains: Villain[];
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
    this.fetchVillains();
  }

  // this is needed in untilDestroyed
  ngOnDestroy(): void {}

  fetchVillains() {
    this.store.dispatch(loadVillains());
    this.store
      .select(selectVillainStore)
      .pipe(untilDestroyed(this))
      .subscribe(({ villains, isLoading, error }) => {
        this.villains = villains;
        this.isLoading = isLoading;
        this.error = error;
      });
  }

  removeVillain(id: string) {
    this.store.dispatch(deleteVillain({ id }));
  }

  onSave() {
    // stop here if form is invalid
    if (this.itemForm.invalid) {
      return;
    }

    this.store.dispatch(createVillain({ villain: this.itemForm.value }));

    this.itemForm.reset();
  }

  onUpdate() {
    // stop here if form is invalid
    if (this.editedForm.invalid) {
      return;
    }

    this.store.dispatch(updateVillain({ villain: this.editedForm.value }));
  }

  goToVillainDetail(id: string) {
    this.router.navigateByUrl("/villains/villain-detail/" + id);
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
