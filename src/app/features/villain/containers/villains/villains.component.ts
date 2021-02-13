import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Villain } from "../../villain.model";
import { selectVillainStore, State } from "src/app/store";
import {
  loadVillains,
  deleteVillain,
  createVillain,
  updateVillain,
} from "src/app/store/actions/villain.actions";

@UntilDestroy()
@Component({
  selector: "app-villains",
  templateUrl: "./villains.component.html",
  styleUrls: ["./villains.component.css"],
})
export class VillainsComponent implements OnInit {
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
    this.store.dispatch(createVillain({ villain: this.itemForm.value }));
  }

  onUpdate() {
    this.store.dispatch(updateVillain({ villain: this.editedForm.value }));
  }

  async goToVillainDetail(id: string) {
    await this.router.navigateByUrl("/villains/villain-detail/" + id);
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
