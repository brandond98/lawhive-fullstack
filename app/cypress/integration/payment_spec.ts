/* eslint-disable no-irregular-whitespace */
describe('Fixed Payments', () => {
  it('Should add a job post', () => {
    cy.visit('http://localhost:3000');

    cy.findByRole('button', {
      name: /create post/i,
    }).click();

    cy.findByRole('textbox', {
      name: /title/i,
    }).type('Test Title');

    cy.findByRole('textbox', {
      name: /description/i,
    }).type('Test description');

    cy.findByRole('button', {
      name: /​/i,
    }).click();

    cy.findByRole('option', {
      name: /fixed fee/i,
    }).click();

    cy.findByRole('spinbutton', {
      name: /amount/i,
    }).type('100');

    cy.findByRole('button', {
      name: /submit/i,
    }).click();
  });

  it('Button should show as "mark as paid" on new post', () => {
    cy.get('#root > section > div > div:last-child > div > button')
      .scrollIntoView()
      .contains('Mark as paid');
  });

  it('Should pay job posting and display correct amount', () => {
    cy.get('#root > section > div > div:last-child > div > button').click();
    cy.get('#root > section > div > div:last-child > div > span').contains(
      'Paid: 100',
    );
  });
});

describe('No win no fee payments', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');

    cy.findByRole('button', {
      name: /create post/i,
    }).click();

    cy.findByRole('textbox', {
      name: /title/i,
    }).type('Test Title');

    cy.findByRole('textbox', {
      name: /description/i,
    }).type('Test description');

    cy.findByRole('button', {
      name: /​/i,
    }).click();

    cy.findByRole('option', {
      name: /no win no fee/i,
    }).click();

    cy.findByRole('spinbutton', {
      name: /percentage/i,
    }).type('64');

    cy.findByRole('spinbutton', {
      name: /expected settlement amount/i,
    }).type('1487');

    cy.findByRole('button', {
      name: /submit/i,
    }).click();
  });

  it('Should enter settlment amount and display correct amount on payment if within threshold', () => {
    cy.get('#root > section > div > div:last-child > div > button').click();
    cy.findByRole('spinbutton', {
      name: /amount/i,
    }).type('1340');

    cy.findByRole('button', {
      name: /submit/i,
    }).click();

    cy.get('#root > section > div > div:last-child > div > span').contains(
      `Paid: ${1340 * 0.64}`,
    );
  });

  it('Should error if settlement amount is not in threshold', () => {
    cy.get('#root > section > div > div:last-child > div > button').click();
    cy.findByRole('spinbutton', {
      name: /amount/i,
    }).type('876');

    cy.findByRole('button', {
      name: /submit/i,
    }).click();

    cy.get('.Toastify__toast-body').contains('Error: Settlement too low!');
  });
});
