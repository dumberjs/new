/// <reference types="Cypress" />

context('The app', () => {
  it('shows hello-world message', () => {
    cy.visit('/');
    // @if aurelia
    cy.get('.hello-world').contains('Hello world from Aurelia!');
    // @endif
    // @if inferno
    cy.get('.hello-world').contains('Hello world from Inferno!');
    // @endif
    // @if react
    cy.get('.hello-world').contains('Hello world from React!');
    // @endif
    // @if vue
    cy.get('.hello-world').contains('Hello world from Vue!');
    // @endif
    // @if no-framework
    cy.get('p').contains('Hello world!');
    // @endif
  });
});
