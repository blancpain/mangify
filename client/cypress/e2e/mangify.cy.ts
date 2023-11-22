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

    it('a session cookie exists', function () {
      cy.getCookie('connect.sid').should('exist');
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
      cy.contains('Please complete your profile to see your macros');
    });

    it('the user can populate their User Settings page and then visit the Nutrition Profile page to see their generated macros', function () {
      cy.contains('Settings').click();
      cy.contains('User Settings').click();
      cy.get('#sex').click();
      cy.contains('Male').click();
      cy.get('#age').type('32');
      cy.get('#height').type('182');
      cy.get('#weight').type('89');

      cy.get('#sync-profile').click();

      cy.contains('Nutrition Profile').click();
      cy.contains('Your nutrition profile');
    });
  });
});

describe('Meal planning', function () {
  beforeEach(function () {
    cy.login({ email: 'blancpain@testing.com', password: 'pass123456' });
  });

  describe('When the user tries to generate a single-day meal plan', function () {
    beforeEach(function () {
      // NOTE: we hard code the date because the json file we use for the fixture has a date of 28 Oct 2023 (months are 0 indexed)
      cy.clock(Date.UTC(2023, 9, 28), ['Date']);
      cy.login({ email: 'blancpain@testing.com', password: 'pass123456' });
      cy.contains('Meal Planner').click();
    });

    it('and there are no errors, they see the meals', function () {
      cy.intercept('POST', '/api/meals/single-day', { fixture: 'exampleTransformedMealData.json' });
      cy.intercept('GET', '/api/meals', { fixture: 'exampleTransformedMealData.json' });
      cy.get('#generate-meals').click();

      cy.contains('Mini Ham Omelets');
    });

    it('and is successful but then tries to re-generate a single meal and gets a 502 - error notification is shown', function () {
      cy.intercept('POST', '/api/meals/single-day', { fixture: 'exampleTransformedMealData.json' });
      cy.intercept('GET', '/api/meals', { fixture: 'exampleTransformedMealData.json' });
      cy.intercept('POST', '/api/meals/one-meal', { statusCode: 502 });
      cy.get('#generate-meals').click();

      cy.contains('Mini Ham Omelets');
      cy.get('#regenerate-meal').click();

      cy.contains('Something went wrong');
    });

    it('but a 502 status code is returned, they see the relevant error notification', function () {
      cy.intercept('POST', '/api/meals/single-day', { statusCode: 502 });
      cy.get('#generate-meals').click();

      cy.contains('Something went wrong');
    });

    it('but an empty response is returned, they see the notification when no meals are returned', function () {
      cy.intercept('POST', '/api/meals/single-day', {});
      cy.get('#generate-meals').click();

      cy.contains('No meals found');
    });
  });

  describe('When the user tries to generate a multi-day meal plan', function () {
    beforeEach(function () {
      cy.clock(Date.UTC(2023, 10, 1), ['Date']);
      cy.login({ email: 'blancpain@testing.com', password: 'pass123456' });
      cy.contains('Meal Planner').click();
    });

    it('and there are no errors, they see the meals', function () {
      cy.get('#calendar-switch').click();
      cy.intercept('POST', '/api/meals/multi-day', {
        fixture: 'exampleTransformedMealDataMultiDay.json',
      });
      cy.intercept('GET', '/api/meals', { fixture: 'exampleTransformedMealDataMultiDay.json' });
      cy.get('#generate-meals').click();

      cy.contains('Baked Apple Pancake');
      cy.contains('Butternut Squash Frittata');
      cy.contains('Surf and Turf Kababs');
    });

    it('and they want to re-generate a single-day but a 502 status code is returned, they see the relevant error notification', function () {
      cy.get('#calendar-switch').click();
      cy.intercept('POST', '/api/meals/single-day', { statusCode: 502 });
      cy.contains('Wednesday, 01 November').get('#single-day-regenerate').click();

      cy.contains('Something went wrong');
    });

    it('but a 502 status code is returned, they see the relevant error notification', function () {
      cy.get('#calendar-switch').click();
      cy.intercept('POST', '/api/meals/multi-day', {
        statusCode: 502,
      });
      cy.get('#generate-meals').click();

      cy.contains('Something went wrong');
    });

    it('but an empty response is returned, they see the notification when no meals are returned', function () {
      cy.get('#calendar-switch').click();
      cy.intercept('POST', '/api/meals/multi-day', {});
      cy.get('#generate-meals').click();

      cy.contains('No meals found');
    });
  });
});
