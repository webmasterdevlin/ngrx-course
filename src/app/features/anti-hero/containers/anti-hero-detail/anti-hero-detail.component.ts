import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-anti-hero-detail",
  templateUrl: "./anti-hero-detail.component.html",
  styleUrls: ["./anti-hero-detail.component.css"],
})
export class AntiHeroDetailComponent implements OnInit {
  id: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getAntiHero();
  }

  private getAntiHero(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
  }
}
