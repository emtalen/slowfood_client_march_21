describe('User can log in', () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3001/api/menu",
      response: "fixture:menu_example.json",
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3001/api/users",
      response: "fixture:log_in.json",
    })
    cy.visit("/")
  })

  
  describe('successfully with correct email and password', () => {
    
    it('is expected for order-burron to appear after successful log-in', () => {
      cy.get('[data-cy="order-button"]').should('not.exist')
      cy.get('[data-cy="log-in-button"]').click()
      cy.get('[data-cy="email-input"]').type("example@example.com")
      cy.get('[data-cy="password-input"]').type("password")
      cy.get('[data-cy="submit-log-in"]').click()
      cy.get('[data-cy="success-message"]').should('contain','You logged in successfully')
      cy.get('[data-cy="order-button"]').should('be.visible')
    });
  })

  describe('unsuccessfully with wrong email', () => {    
    
    it('is expected to show error message', () => {      
      cy.get('[data-cy="log-in-button"]').click()
      cy.get('[data-cy="email-input"]').type("wrong@example.com")
      cy.get('[data-cy="password-input"]').type("password")
      cy.get('[data-cy="submit-log-in"]').click()
      cy.get('[data-cy="success-message"]').should('contain','Wrong email or password')      
    });
  })

  describe('unsuccessfully with wrong password', () => {    
    
    it('is expected to show error message', () => {      
      cy.get('[data-cy="log-in-button"]').click()
      cy.get('[data-cy="email-input"]').type("example@example.com")
      cy.get('[data-cy="password-input"]').type("wrongPassword")
      cy.get('[data-cy="submit-log-in"]').click()
      cy.get('[data-cy="success-message"]').should('contain','Wrong email or password')      
    });
  })
})
