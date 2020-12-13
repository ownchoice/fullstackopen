describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'user01',
      password: 'testpw',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  describe('Login form', function () {
    it('Login button is shown', function () {
      cy.contains('login')
    })

    it('Login form is shown after click', function () {
      cy.contains('login').click()
      cy.get('#username').should('be.visible')
      cy.get('#password').should('be.visible')
      cy.get('#login-button').should('be.visible').and('contain', 'login')
      cy.contains('cancel')
    })
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('user01')
      cy.get('#password').type('testpw')
      cy.get('#login-button').click()

      cy.contains('login successful')
      cy.get('html').should('contain', 'login successful')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('user01')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong credentials')
    })
  })
})
