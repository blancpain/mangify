// NOTE: arrow functions are discouraged in Cypress

/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
describe('Log in and out', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:8080/api/testing/reset');
    const newUser = {
      name: 'Blancpain',
      email: 'blancpain@testing.com',
      password: 'pass123456',
      confirmPassword: 'pass123456',
    };
    cy.request('POST', 'http://localhost:8080/api/users/', newUser);
    cy.visit('');
  });

  describe('When a user visits the home page', function () {
    it('the Sign up and Log in buttons are shown', function () {
      cy.contains('Log in');
      cy.contains('Sign up');
    });
  });

  describe('When a user tries to login', function () {
    it('they succeed with correct credentials', function () {
      cy.contains('Log in').click();
      cy.get('#email').type('blancpain@testing.com');
      cy.get('#password').type('pass123456');
      cy.get('#login-button').click();

      cy.contains('Meal Planner');
    });

    it('they fail with incorrect credentials', function () {
      cy.contains('Log in').click();
      cy.get('#email').type('test@test.com');
      cy.get('#password').type('wrongPass');
      cy.get('#login-button').click();

      cy.get('#form-error').should('contain', 'Invalid email or password');

      cy.get('html').should('not.contain', 'Meal Planner');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ email: 'blancpain@testing.com', password: 'pass123456' });
    });

    it('user can successfully log out', function () {
      cy.get('#user-name').click();
      cy.contains('Logout').click();
      cy.contains('Home');
    });
  });
});

describe('Nutrition profile', function () {
  beforeEach(function () {
    cy.login({ email: 'blancpain@testing.com', password: 'pass123456' });
  });

  describe('When a user logs in for the first time', function () {
    it('and navigates to their Nutrition Profile page, it would nudge them to complete their User Settings', function () {
      cy.contains('Nutrition Profile').click();
      // TODO: update below once finalised
      cy.contains('Please fill out your profile - click here...');
    });

    it('the user can populate their User Settings page and then visit the Nutrition Profile page to see their generated macros', function () {
      cy.contains('Settings').click();
      cy.contains('User Settings').click();
      cy.get('#sex').click();
      cy.contains('Male').click();
      cy.get('#age').type('32');
      cy.get('#height').type('182');
      cy.get('#weight').type('89');

      cy.contains('Nutrition Profile').click();
      cy.contains('Your nutrition profile');
    });
  });
});

describe('Meal planning', function () {
  beforeEach(function () {
    cy.login({ email: 'blancpain@testing.com', password: 'pass123456' });
  });

  describe('When logged in and on the Meal Planner page', function () {
    beforeEach(function () {
      cy.login({ email: 'blancpain@testing.com', password: 'pass123456' });
      cy.contains('Meal Planner').click();
    });

    it('and the user tries to generate a single day meal-plan', function () {
      cy.intercept('POST', '/api/meals/single-day', { fixture: 'exampleTransformedMealData.json' });
      cy.intercept('GET', '/api/meals', { fixture: 'exampleTransformedMealData.json' });
      cy.get('#generate-meals').click();

      cy.contains('Mini Ham Omelets').click();
    });
  });
});
