declare namespace Cypress {
  interface Chainable {
    login(credentials: { email: string; password: string }): Chainable<void>;
  }
}
