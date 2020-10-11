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

  describe('4-8 Blog list tests step1', () => {
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

  describe('4-13 Blog list expansions step1', () => {
    test('should delete a blog and give a 204 status code', async () => {
      const blogsAtBeginning = await helper.blogsInDb()
      await api
        .delete(`/api/blogs/${blogsAtBeginning[0].id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(blogsAtBeginning.length - 1)
    })
  })
  
  describe('4-14 Blog list expansions step2', () => {
    test('should be updated', async () => {
      const blogsAtBeginning = await helper.blogsInDb()
      const oldBlog = blogsAtBeginning[0]
      const updatedBlog = { ...oldBlog,  title: 'Updated title' }
      const response = await api
        .put(`/api/blogs/${oldBlog.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect(updatedBlog)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(blogsAtBeginning.length)
      expect(response.body).toEqual(updatedBlog)
      // console.log(response)
      expect(blogsAtEnd.find(blog => blog.id === oldBlog.id)).toEqual(updatedBlog)
    })
  })
})


afterAll(() => {
  mongoose.connection.close()
})