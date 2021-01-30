@epam
Feature: Epam site features

  @menu
  Scenario Outline: Url validation for <Page> page
    Given I open "https://www.epam.com/" url
    When I click "<Menu>" menu
    Then "<Page>" page is opened
    When I wait "2" seconds

    Examples:
    | Menu           | Page            |
    | Services       | Services        |
    | How We Do It   | How We Do It    |
    | Our Work       | Our Work        |
    | Insights       | Insights        |
    | About          | About           |
    | Careers        | Careers         |

  @positions
  Scenario Outline: Careers page - search for position
    Given I open "https://www.epam.com/careers" url
    When I populate "<Keyword>" in "Job Input" field
      And I select "<Location>" location in "Location" dropdown
      And I click "Find" button
    Then "<Keyword>" position is displayed
    When I wait "2" seconds

    Examples:
    | Keyword                             | Location            |
    | Automated Testing Engineer          | Vitebsk             |
    | Java Developer                      | Minsk               |
