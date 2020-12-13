const blogList = [
  {
    title: 'Xataka',
    author: 'Webedia',
    url: 'https://www.xataka.com/',
    likes: 18,
  },
  {
    title: 'Genbeta',
    author: 'Webedia',
    url: 'https://www.genbeta.com/',
    likes: 5,
  },
  {
    title: 'Blog sobre Adsense',
    author: 'Bruno Ramos',
    url: 'https://brunoramos.es/',
    likes: 23,
  },
  {
    title: 'Chuiso',
    author: 'Álvaro',
    url: 'https://chuiso.com/',
    likes: 32,
  },
]

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
      // cy.request('POST', 'http://localhost:3001/api/login', {
      //   username: 'user01',
      //   password: 'testpw',
      // }).then((response) => {
      //   localStorage.setItem('loggedUser', JSON.stringify(response.body))
      //   cy.visit('http://localhost:3000')
      // })
      cy.login({ username: 'user01', password: 'testpw' })
    })

    it('a new blog can be added', function () {
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

    it('can add many blogs', function () {
      blogList.forEach((blog) =>
        cy.addBlogWithForm({
          title: blog.title,
          author: blog.author,
          url: blog.url,
        })
      )
      // cy.addBlogWithForm({
      //   title: 'Xataka',
      //   author: 'Webedia',
      //   url: 'https://www.xataka.com/',
      // })
      // cy.addBlogWithForm({
      //   title: 'Genbeta',
      //   author: 'Webedia',
      //   url: 'https://www.genbeta.com/',
      // })
      // cy.addBlogWithForm({
      //   title: 'Blog sobre Adsense',
      //   author: 'Bruno Ramos',
      //   url: 'https://brunoramos.es/',
      // })
      // cy.addBlogWithForm({
      //   title: 'Chuiso',
      //   author: 'Álvaro',
      //   url: 'https://chuiso.com/',
      // })
    })

    it('can like a blog', function () {
      cy.addBlogWithForm({
        title: 'Chuiso',
        author: 'Álvaro',
        url: 'https://chuiso.com/',
      })

      cy.contains('show details').click()

      cy.contains('(0 👍)')
      cy.contains('like').click()
      cy.contains('(1 👍)')
      cy.contains('like').click()
      cy.contains('(2 👍)')
    })

    it('the user can delete his blog', function () {
      cy.addBlogWithForm({
        title: 'My nice blog',
        author: 'Me, myself',
        url: 'https://myblog.com/',
      })

      cy.contains('show details').click()

      cy.contains('delete').click()
      cy.get('html').should('contain', 'blog deleted')
      cy.get('html').should('not.contain', 'My nice blog')
      cy.get('html').should('not.contain', 'Me, myself')
      cy.get('html').should('not.contain', 'show details')
    })

    it('the user can cancel the deletion of a blog', function () {
      cy.addBlogWithForm({
        title: 'My nice blog',
        author: 'Me, myself',
        url: 'https://myblog.com/',
      })

      cy.contains('show details').click()

      // https://docs.cypress.io/api/events/catalog-of-events.html#App-Events
      // https://stackoverflow.com/questions/59768090/cypress-confirmation-dialog
      cy.on('window:confirm', () => false)

      cy.contains('delete').click()
      cy.get('html').should('not.contain', 'blog deleted')
      cy.get('html').should('contain', 'My nice blog')
      cy.get('html').should('contain', 'Me, myself')
      cy.get('html').should('contain', 'hide details')
    })

    it('cannot delete another´s user blog', function () {
      cy.addBlogWithForm({
        title: 'My nice blog',
        author: 'Me, myself',
        url: 'https://myblog.com/',
      })
      cy.createUser({ name: 'Matthew', username: 'matt', password: '123456' })
      cy.login({ username: 'matt', password: '123456' })

      cy.contains('show details').click()
      cy.contains('delete').click()
      cy.get('#notification').as('notificationDiv')
      cy.get('@notificationDiv').should(
        'contain',
        'error: only the author can delete a blog'
      )
      cy.get('@notificationDiv').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('@notificationDiv').should('have.css', 'border-style', 'solid')
    })
  })

  it('blogs are sorted by like count', function () {
    blogList.forEach((blog) =>
      cy.addBlog({
        username: 'user01',
        password: 'testpw',
        ...blog,
      })
    )
    cy.login({ username: 'user01', password: 'testpw' })
    cy.get('li[class="blog"] > button').each(($li, index, $lis) => {
      $li.click()
    })
    cy.get('.blog')
      .each(($li, index, $lis) => {
        if (index < $lis.length - 1) {
          // https://stackoverflow.com/questions/14867835/get-substring-between-two-characters-using-javascript
          // console.log($li[0].innerText)
          // console.log($li.text())
          let likesSubstring = $li.text().substring(
            $li.text().lastIndexOf(' (') + 2,
            $li.text().lastIndexOf(' 👍)')
          )
          let likesSubstring2 = $lis[index + 1].innerText.substring(
            $lis[index + 1].innerText.lastIndexOf(' (') + 2,
            $lis[index + 1].innerText.lastIndexOf(' 👍)')
          )
          expect(parseInt(likesSubstring)).to.be.greaterThan(parseInt(likesSubstring2))
        }
      })
      .then(($lis) => {
        expect($lis).to.have.length(blogList.length)
      })
  })
})
