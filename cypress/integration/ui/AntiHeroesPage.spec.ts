/// <reference types="cypress"/>

const ANTI_HEROES = [
  {
    id: "6o7edyikuyg",
    firstName: "Barry",
    lastName: "Allen",
    house: "DC",
    knownAs: "Flash",
  },
  {
    id: "97rfikuiyhoi",
    firstName: "Scott",
    lastName: "Summer",
    house: "Marvel",
    knownAs: "Cyclopes",
  },
];

describe("AntiHeroes Page", () => {
  beforeEach(() => {
    /* Custom commands. Please see support/commands.ts
     * and the global.d.ts for intellisense */
    cy.getCommand("/api/v1/anti-heroes", ANTI_HEROES);
    cy.deleteCommand("/api/v1/anti-heroes/*");

    cy.visit("/");
    cy.get("[data-testid=more]").click();
    cy.get("[data-testid=nav-anti-heroes]").click();
    cy.SetupInputFieldsCommand();
  });

  it("should render anti heroes", () => {
    cy.get("[data-testid=card]").should("have.length", ANTI_HEROES.length);
    cy.get("[data-testid=total-anti-heroes]").should(
      "contain",
      ANTI_HEROES.length
    );
  });

  describe("AntiHero's detail", () => {
    it("should navigate to anti hero's detail after clicking a detail button", () => {
      cy.get("[data-testid=detail-button]").eq(1).click();
      cy.location("pathname").should("contain", "/anti-hero-detail/");
    });
  });

  describe("Soft delete an anti hero", () => {
    it("should remove temporarily a card after clicking a soft-delete button", () => {
      const index = 1;
      cy.get("[data-testid=soft-delete-button]").eq(index).click();
      cy.get("[data-testid=card]").should(
        "have.length",
        ANTI_HEROES.length - 1
      );
    });

    it("should remove temporarily a chip after clicking a soft-delete button", () => {
      const index = 1;
      cy.get("[data-testid=soft-delete-button]").eq(index).click();
      cy.get("[data-testid=anti-hero-chip]").should(
        "have.length",
        ANTI_HEROES.length - 1
      );
    });

    it("should deduct 1 temporarily from the total anti heroes after clicking a soft-delete button", () => {
      const index = 1;
      cy.get("[data-testid=soft-delete-button]").eq(index).click();
      cy.get("[data-testid=total-anti-heroes]").should(
        "contain",
        ANTI_HEROES.length - 1
      );
    });
  });

  describe("Delete an anti hero", () => {
    it("should remove a card after clicking a delete button", () => {
      const index = 1;
      cy.get("[data-testid=delete-button]").eq(index).click();
      cy.get("[data-testid=card]").should(
        "have.length",
        ANTI_HEROES.length - 1
      );
    });

    it("should remove a chip after clicking a delete button", () => {
      const index = 1;
      cy.get("[data-testid=delete-button]").eq(index).click();
      cy.get("[data-testid=anti-hero-chip]").should(
        "have.length",
        ANTI_HEROES.length - 1
      );
    });

    it("should deduct 1 from the total anti heroes after clicking a delete button", () => {
      const index = 1;
      cy.get("[data-testid=delete-button]").eq(index).click();
      cy.get("[data-testid=total-anti-heroes]").should(
        "contain",
        ANTI_HEROES.length - 1
      );
    });
  });

  describe("Add a new anti hero", () => {
    it("should create a new anti hero after filling out the form", () => {
      const firstName = "Bucky";
      const lastName = "Barnes";
      const house = "Marvel";
      const knownAs = "The Winter Soldier";

      cy.get("@FirstName").type(firstName);
      cy.get("@LastName").type(lastName);
      cy.get("@House").type(house);
      cy.get("@KnownAs").type(knownAs);

      cy.postCommand("/api/v1/anti-heroes", {
        firstName,
        lastName,
        house,
        knownAs,
      });

      cy.get("@SaveUpdate").click();

      cy.get("[data-testid=card]").should(
        "have.length",
        ANTI_HEROES.length + 1
      );
      cy.get("[data-testid=anti-hero-chip]").should(
        "have.length",
        ANTI_HEROES.length + 1
      );
      cy.get("[data-testid=total-anti-heroes]").contains(
        ANTI_HEROES.length + 1
      );
    });
  });

  describe("Refetch", () => {
    it("should refetch all anti heroes after soft deleting all anti heroes", () => {
      cy.get("[data-testid=soft-delete-button]").each(($el) =>
        cy.wrap($el).click()
      );
      cy.get("[data-testid=card]").should("not.exist");
      cy.get("[data-testid=refetch-button]").click();
      cy.get("[data-testid=card]").should("have.length", ANTI_HEROES.length);
      cy.get("[data-testid=anti-hero-chip]").should(
        "have.length",
        ANTI_HEROES.length
      );
      cy.get("[data-testid=total-anti-heroes]").contains(ANTI_HEROES.length);
    });

    it("should refetch all anti-heroes after deleting all anti-heroes", () => {
      cy.get("[data-testid=delete-button]").each(($el) => cy.wrap($el).click());
      cy.get("[data-testid=card]").should("not.exist");
      cy.get("[data-testid=refetch-button]").click();
      cy.get("[data-testid=card]").should("have.length", ANTI_HEROES.length);
      cy.get("[data-testid=anti-hero-chip]").should(
        "have.length",
        ANTI_HEROES.length
      );
      cy.get("[data-testid=total-anti-heroes]").contains(ANTI_HEROES.length);
    });
  });
});
