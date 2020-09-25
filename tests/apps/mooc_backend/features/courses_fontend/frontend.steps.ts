import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I create a new course with name {string}', (courseName: string) => {
  cy.visit('http://localhost:8032/courses');
  cy.get('input[name="name"]').type(courseName);
  cy.get('input[name="duration"]').type('8 days');
  cy.get('form').submit();
});

Then('a new flash message with content {string} is shown', (message: string) => {
  cy.get('div[role="alert"]').contains(message);
});

Then('the page should increment the numbers courses to {int}', (numberOfCourses: number) => {
  cy.contains(`Actualmente CodelyTV Pro cuenta con ${numberOfCourses} cursos.`);
});
