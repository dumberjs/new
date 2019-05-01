/// <reference types="Cypress" />

context('The app', () => {
  it('shows home page', () => {
    cy.visit('/');
    cy.title().should('equal', 'Home | Dumber Demo');
    cy.get('router-view').contains('Home!');
  });

  it('shows foo page', () => {
    cy.visit('/foo');
    cy.title().should('equal', 'Foo | Dumber Demo');
    cy.get('router-view').contains('Foo!');
  });

  it('navigates', () => {
    cy.visit('/');
    cy.get('.menu-link').contains('Foo').click();
    cy.location('pathname').should('equal', '/foo');
    cy.title().should('equal', 'Foo | Dumber Demo');
    cy.get('router-view').contains('Foo!');

    cy.get('.menu-link').contains('Home').click();
    cy.title().should('equal', 'Home | Dumber Demo');
    cy.get('router-view').contains('Home!');
    cy.location('pathname').should('equal', '/');
  });
});
