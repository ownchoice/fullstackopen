const bcrypt = require('bcryptjs')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

// jest.useFakeTimers()

describe('test blogs controller', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()

    const blogObjects = helper.initialBlogs.map(blog => new Blog({ ...blog, user: user.toJSON().id }))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  describe('get blog list', () => {
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
      const randomBlogTitle = (await Blog.findOne({})).toJSON().title
      expect(titles).toContainEqual(randomBlogTitle)  // updated
    })
  })
  

  describe('toJSON should set the id property', () => {
    test('the unique identifier property of the blog posts is named id', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body[0].id).toBeDefined()
    })
  })
  
  describe('add a new blog', () => {
    const newBlog = {
      title: 'Book test title',
      author: 'Book test author',
      url: 'http://book-test.com/url.html',
      likes: 99,
    }

    test('should be added successfully', async () => {
      await api
        .post('/api/blogs')
        .set({
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJsb2dtYWtlciIsImlkIjoiNWY4MTIzMTUwYTgzY2M1MTFjNDg0ZWYxIiwiaWF0IjoxNjAyMzgwMjkzfQ.0EM8zPk1UVO0BeDOEXncvicJd100Ded_rAS78R8zI_8',
          Accept: 'application/json'
        })
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(n => n.title)
      expect(titles).toContainEqual(newBlog.title)
    })

    test('should fail with a 401 invalid token', async () => {
      const response = await api
        .post('/api/blogs')
        .set({
          'Authorization': 'Bearer someInvalidToken',
          Accept: 'application/json'
        })
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
      
      expect(response.body.error).toBeDefined()
    })

    test('should fail with a 401 no token provided', async () => {
      response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
    })
    
    expect(response.body.error).toBeDefined()
  })


  describe('likes set to 0 by default', () => {
    test('should be equal to 0 when not provided', async () => {
      const newBlog = {
        title: 'Book test title',
        author: 'Book test author',
        url: 'http://book-test.com/url.html',
      }

      await api
        .post('/api/blogs')
        .set({
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJsb2dtYWtlciIsImlkIjoiNWY4MTIzMTUwYTgzY2M1MTFjNDg0ZWYxIiwiaWF0IjoxNjAyMzgwMjkzfQ.0EM8zPk1UVO0BeDOEXncvicJd100Ded_rAS78R8zI_8',
          Accept: 'application/json'
        })
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      
      const response = await api.get('/api/blogs')
      expect(response.body[response.body.length - 1].likes).toBe(0)
    })
  })
  
  describe('add a new blog without required fields', () => {
    test('should be rejected because of missing title', async () => {
      const newBlog = {
        author: 'Book test author',
        url: 'http://book-test.com/url.html',
      }

      await api
        .post('/api/blogs')
        .set({
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJsb2dtYWtlciIsImlkIjoiNWY4MTIzMTUwYTgzY2M1MTFjNDg0ZWYxIiwiaWF0IjoxNjAyMzgwMjkzfQ.0EM8zPk1UVO0BeDOEXncvicJd100Ded_rAS78R8zI_8',
          Accept: 'application/json'
        })
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
        .set({
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJsb2dtYWtlciIsImlkIjoiNWY4MTIzMTUwYTgzY2M1MTFjNDg0ZWYxIiwiaWF0IjoxNjAyMzgwMjkzfQ.0EM8zPk1UVO0BeDOEXncvicJd100Ded_rAS78R8zI_8',
          Accept: 'application/json'
        })
        .send(newBlog)
        .expect(400)
    })
  })

  describe('delete a blog', () => {
    test('should delete a blog and answer with a 204 status code', async () => {
      const blogsAtBeginning = await helper.blogsInDb()
      await api
        .delete(`/api/blogs/${blogsAtBeginning[0].id}`)
        .set({
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJsb2dtYWtlciIsImlkIjoiNWY4MTIzMTUwYTgzY2M1MTFjNDg0ZWYxIiwiaWF0IjoxNjAyMzgwMjkzfQ.0EM8zPk1UVO0BeDOEXncvicJd100Ded_rAS78R8zI_8',
          Accept: 'application/json'
        })
        .expect(204)
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(blogsAtBeginning.length - 1)
    })

    test('should fail to delete a blog because of invalid token', async () => {
      const blogsAtBeginning = await helper.blogsInDb()
      await api
        .delete(`/api/blogs/${blogsAtBeginning[0].id}`)
        .set({
          'Authorization': 'Bearer someInvalidToken',
          Accept: 'application/json'
        })
        .expect(401)
    })

    test('should fail to delete a blog because of missing token', async () => {
      const blogsAtBeginning = await helper.blogsInDb()
      await api
        .delete(`/api/blogs/${blogsAtBeginning[0].id}`)
        .expect(401)
    })
  })
  
  describe('update an existing blog', () => {
    test('should be updated successfully', async () => {
      const blogsAtBeginning = await helper.blogsInDb()
      const oldBlog = blogsAtBeginning[0]
      const updatedBlog = { ...oldBlog,  title: 'Updated title' }
      const response = await api
        .put(`/api/blogs/${oldBlog.id}`)
        .set({
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJsb2dtYWtlciIsImlkIjoiNWY4MTIzMTUwYTgzY2M1MTFjNDg0ZWYxIiwiaWF0IjoxNjAyMzgwMjkzfQ.0EM8zPk1UVO0BeDOEXncvicJd100Ded_rAS78R8zI_8',
          Accept: 'application/json'
        })
        .send(updatedBlog)
        .expect(200)
        .expect(updatedBlog)
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(blogsAtBeginning.length)
      expect(response.body).toEqual(updatedBlog)
      // console.log(response)
      expect(blogsAtEnd.find(blog => blog.id === oldBlog.id)).toEqual(updatedBlog)
    })

    test('should fail to update because of invalid token', async () => {
      const blogsAtBeginning = await helper.blogsInDb()
      const oldBlog = blogsAtBeginning[0]
      const updatedBlog = { ...oldBlog,  title: 'Updated title' }
      const response = await api
        .put(`/api/blogs/${oldBlog.id}`)
        .set({
          'Authorization': 'Bearer someInvalidToken',
          Accept: 'application/json'
        })
        .send(updatedBlog)
        .expect(401)
    })

  })

})

afterAll(async () => {
  await mongoose.connection.close()
})