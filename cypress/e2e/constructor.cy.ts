import ingredients from '../fixtures/ingredients.json';

describe('доступность приложения', () => {
  it('сервис должен быть доступен по адресу localhost:4000', () => {
    cy.visit('http://localhost:4000');
  })
});

describe('страница конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      statusCode: 200,
      body: ingredients,
    }).as('getIngredients');
    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients').its('response.statusCode').should('eq', 200);
  });

  it('добавление булки и начинок в конструктор', () => {
    cy.get('[data-cy="bun"]').first().contains('Добавить').click();
    cy.get('[data-cy="main"]').first().contains('Добавить').click();
    cy.get('[data-cy="main"]').eq(3).contains('Добавить').click();
    cy.get('[data-cy="sauce"]').first().contains('Добавить').click();
    cy.get('[data-cy="constructor"]').find('[data-cy="bun-top"]').should('exist');
    cy.get('[data-cy="constructor"]').find('[data-cy="filling"]').should('exist');
  });
});

