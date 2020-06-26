@smoke
Feature: Hero section

  Background:
    Given I am on 'Home' page

  @add(1) @createUser(PRO|today)
  Scenario: 1. Verification that hero section is displayed
    Then I should be on 'Home' page

  @wip
  Scenario: 2. Example
    When New step
    Then New step
    And New step
    But New step

  @wip
  Scenario Outline: 3.<id> Example
    Given I am on 'Home' page
    When Step
      | a | 1 |
      | b | 2 |
    Then I should not be on 'Home' page

    Examples:
      | id |
      | 1  |
      | 2  |
