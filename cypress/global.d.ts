/// <reference types="cypress"/>

declare namespace Cypress {
  interface Chainable {
    getCommand(url: string, responseBody: Array<T>): Chainable<T>;
    deleteCommand(url: string): Chainable<any>;
    postCommand(url: string, requestBody: T): Chainable<T>;
    SetupInputFieldsCommand(): Chainable<T>;
    NavigateByTestIdCommand(testId: string): Chainable<T>;
  }
}
