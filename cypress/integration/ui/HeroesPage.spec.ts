/// <reference types="cypress"/>

const HEROES = [
  {
    id: "7ggew732dw",
    firstName: "Barry",
    lastName: "Allen",
    house: "DC",
    knownAs: "Flash",
  },
  {
    id: "43twagfdh",
    firstName: "Scott",
    lastName: "Summer",
    house: "Marvel",
    knownAs: "Cyclopes",
  },
];

describe("Heroes Page", () => {
  beforeEach(() => {
    /* Custom commands. Please see support/commands.ts
     * and the global.d.ts for intellisense */
    cy.getCommand("/heroes", HEROES);
    cy.deleteCommand("/heroes/*");
    cy.visit("/");
    cy.SetupInputFieldsCommand();
  });

  it("should render heroes", () => {
    cy.get("[data-testid=card]").should("have.length", HEROES.length);
    cy.get("[data-testid=total-heroes]").should("contain", HEROES.length);
  });

  describe("Navigate to a hero's detail", () => {});
  describe("Soft delete a hero", () => {
    it("should soft delete a hero after clicking a soft delete button", () => {
      cy.get("[data-testid=soft-delete-button]").eq(1).click();
      cy.get("[data-testid=soft-delete-button]").should(
        "have.length",
        HEROES.length - 1
      );
      cy.get("[data-testid=hero-chip]").should(
        "have.length",
        HEROES.length - 1
      );
      cy.get("[data-testid=total-heroes]").should("contain", HEROES.length - 1);
    });
  });
  describe("Delete a hero", () => {});
  describe("Add a new hero", () => {});
  describe("Update a new hero", () => {});
  describe("Update an existing hero", () => {});
});
