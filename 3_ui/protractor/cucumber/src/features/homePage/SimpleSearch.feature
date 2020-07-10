Feature: Simple search

  Scenario: 1. Executing simple search
    Given I am on 'Home' page
    Then I should be on 'Home' page
    When I execute search for 'e2e' search term on the 'Home' page
    Then I should be on 'Docs' page
