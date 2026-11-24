Feature: Ecommerce validation

  Scenario: placing the order
    Given login Ecommerce application with "username" and "password"
    When Add "iphone 13 pro" to the cart
    Then verify "iphone 13" should be displayed in the cart
    When Enter valid details and Place the order
    Then  Verify order in present in the OrderHistory