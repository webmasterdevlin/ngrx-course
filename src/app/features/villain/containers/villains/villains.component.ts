import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Villain } from "../../villain.model";
import { State } from "src/app/store";
import { selectVillainStore } from "src/app/store/selectors/villain.selectors";
import {
  loadVillains,
  deleteVillain,
  createVillain,
  updateVillain,
  softDeleteVillain,
} from "src/app/store/actions/villain.actions";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

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
  isLoading = false;
  editingTracker = "0";

  constructor(
    private store: Store<State>,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchVillains();
    this.formBuilderInit();
  }

  handleDeleteVillain(id: string) {
    this.store.dispatch(deleteVillain({ id }));
  }

  handleCreateVillain() {
    this.store.dispatch(createVillain({ villain: this.itemForm.value }));
  }

  handleUpdateVillain() {
    this.store.dispatch(updateVillain({ villain: this.editedForm.value }));
  }

  handleNavigateVillainDetail(id: string) {
    this.router.navigateByUrl("/villains/villain-detail/" + id);
  }

  handleSoftDeleteVillain(id: string) {
    this.store.dispatch(softDeleteVillain({ id }));
  }

  private fetchVillains() {
    this.store.dispatch(loadVillains());
    this.store
      .select(selectVillainStore)
      .pipe(untilDestroyed(this))
      .subscribe(({ villains, isLoading, error }) => {
        this.villains = villains;
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
