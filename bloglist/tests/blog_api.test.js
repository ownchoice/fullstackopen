const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(titles).toContainEqual(
      'TDD harms architecture'
    )
  })

  describe('4-9 Blog list tests step2', () => {
    test('the unique identifier property of the blog posts is named id', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body[0].id).toBeDefined()
    })
  })
  
  describe('4-10 Blog list tests step3', () => {
    
    test('should be added', async () => {
      const newBlog = {
        title: 'Book test title',
        author: 'Book test author',
        url: 'http://book-test.com/url.html',
        likes: 99,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(n => n.title)
      expect(titles).toContainEqual(
        'Book test title'
      )
    })
  })


  describe('4-11 Blog list tests step4', () => {
    test('should be equal to 0 by default', async () => {
      const newBlog = {
        title: 'Book test title',
        author: 'Book test author',
        url: 'http://book-test.com/url.html',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      
      const response = await api.get('/api/blogs')
      expect(response.body[response.body.length - 1].likes).toBe(0)
    })
  })
  
  describe('4-12 Blog list tests step5', () => {
    test('should be rejected because of missing title', async () => {
      const newBlog = {
        author: 'Book test author',
        url: 'http://book-test.com/url.html',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })

    test('should be rejected because of missing url', async () => {
      const newBlog = {
        title: 'Book test title',
        author: 'Book test author',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })
  })
  

  // describe('viewing a specific blog', () => {

  //   test('succeeds with a valid id', async () => {
  //     const blogsAtStart = await helper.blogsInDb()

  //     const blogToView = blogsAtStart[0]

  //     const resultBlog = await api
  //       .get(`/api/blogs/${blogToView.id}`) // It's not _id because of .toJSON()
  //       .expect(200)
  //       .expect('Content-Type', /application\/json/)

  //     expect(resultBlog.body).toEqual(blogToView)
  //   })

  //   test('fails with statuscode 404 if blog does not exist', async () => {
  //     const validNonexistingId = await helper.nonExistingId()

  //     console.log('validNonexistingId: ', validNonexistingId)

  //     await api
  //       .get(`/api/blogs/${validNonexistingId}`)
  //       .expect(404)
  //   })

  //   test('fails with statuscode 400 id is invalid', async () => {
  //     const invalidId = '5a3d5da59070081a82a3445'

  //     await api
  //       .get(`/api/blogs/${invalidId}`)
  //       .expect(400)
  //   })
  // })

  // describe('addition of a new blog', () => {
  //   test('succeeds with valid data', async () => {
      // const newBlog = {
      //   title: 'Book test title',
      //   author: 'Book test author',
      //   url: 'http://book-test.com/url.html',
      //   likes: 99,
      // }

      // await api
      //   .post('/api/blogs')
      //   .send(newBlog)
      //   .expect(200)
      //   .expect('Content-Type', /application\/json/)


      // const blogsAtEnd = await helper.blogsInDb()
      // expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

      // const titles = blogsAtEnd.map(n => n.title)
      // expect(titles).toContainEqual(
      //   'Book test title'
      // )
  //   })

  //   test('fails with status code 400 if data invalid', async () => {
  //     const newBlog = {
  //       likes: 99
  //     }

  //     await api
  //       .post('/api/blogs')
  //       .send(newBlog)
  //       .expect(400)

  //     const blogsAtEnd = await helper.blogsInDb()

  //     expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  //   })
  // })

  // describe('deletion of a blog', () => {
  //   test('succeeds with status code 204 if id is valid', async () => {
  //     const blogsAtStart = await helper.blogsInDb()
  //     const blogToDelete = blogsAtStart[0]

  //     await api
  //       .delete(`/api/blogs/${blogToDelete.id}`)
  //       .expect(204)

  //     const blogsAtEnd = await helper.blogsInDb()

  //     expect(blogsAtEnd.length).toBe(
  //       helper.initialBlogs.length - 1
  //     )

  //     const titles = blogsAtEnd.map(r => r.title)

  //     expect(titles).not.toContainEqual(blogToDelete.title)
  //   })
  // })
})


afterAll(() => {
  mongoose.connection.close()
})