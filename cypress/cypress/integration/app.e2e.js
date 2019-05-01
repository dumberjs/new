/// <reference types="Cypress" />

context('The app', () => {
  it('shows message', () => {
    cy.visit('/');
    // @if aurelia
    cy.get('.app').contains('Hello Aurelia!');
    // @endif
    // @if inferno
    cy.get('.app').contains('Hello Inferno!');
    // @endif
    // @if react
    cy.get('.app').contains('Hello React!');
    // @endif
    // @if vue
    cy.get('.app').contains('Hello Vue!');
    // @endif
  });
});
