Feature: Create a new course at the Backoffice
  In order to have courses in the platform
  As a user with admin permissions
  I want to create a new course

  Scenario: There aren't any course
    Given I create a new course with name "The best course"
    Then a new flash message with content "Felicidades, el curso The best course ha sido creado!" is shown
    And the page should increment the numbers courses to 1
