import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectHero, State } from "../../../reducers";
import { loadHeroes } from "../../hero.actions";
import { Subscription, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Hero } from "../../hero.model";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"]
})
export class HeroesComponent implements OnInit, OnDestroy {
  sub: Subscription;
  list$?: any;
  list?: Hero[];

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(loadHeroes());
    this.sub = this.store
      .select(selectHero)
      .pipe(catchError(err => throwError(err)))
      .subscribe(data => (this.list = data));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
