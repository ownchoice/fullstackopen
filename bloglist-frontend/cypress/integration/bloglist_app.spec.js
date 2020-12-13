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
      cy.contains('logged in as')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('user01')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('html').should('not.contain', 'logged in as')
      cy.contains('wrong credentials')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'user01',
        password: 'testpw',
      }).then((response) => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it.only('a new blog can be added', function () {
      cy.contains('add blog').click()
      cy.get('#title').type('Xataka')
      cy.get('#author').type('webedia')
      cy.get('#url').type('https://www.xataka.com/')
      cy.get('#submit-button').click()
      cy.contains('Xataka')
      cy.contains('webedia')
      cy.contains('show details').click()
      cy.contains('https://www.xataka.com/')
    })
  })
})
