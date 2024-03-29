// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('createUser', (user) => {
  cy.request('POST', 'http://localhost:3001/api/users/', user)
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add(
  'addBlog',
  ({ username, password, title, author, url, likes }) => {
    cy.request('POST', 'http://localhost:3001/api/login', {
      username,
      password,
    }).then(({ body }) => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:3001/api/blogs',
        auth: {
          bearer: body.token,
        },
        body: {
          title,
          author,
          url,
          likes,
        },
      }).then(() => {
        cy.visit('http://localhost:3000')
      })
    })
  }
)

Cypress.Commands.add('addBlogWithForm', ({ title, author, url }) => {
  cy.contains('add blog').click()
  cy.get('#title').type(title)
  cy.get('#author').type(author)
  cy.get('#url').type(url)
  cy.get('#submit-button').click()
  cy.contains('cancel').click()
})
