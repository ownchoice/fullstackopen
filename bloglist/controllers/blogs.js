const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
// const jwt = require('jsonwebtoken')
// const jwt = require('express-jwt')
const middleware = require('../utils/middleware')
// const config = require('../utils/config')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  // const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, _id: 0 })  // Without ID
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).json({ error: 'Blog not found' })
  }
})

blogsRouter.use(middleware.userAuthenticationRequired)

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  // const decodedToken = jwt.verify(request.token, config.SECRET)
  // if (!request.token || !decodedToken.id) {
  //   return response.status(401).json({ error: 'token missing or invalid' })
  // }
  // const user = await User.findById(decodedToken.id)
  const user = await User.findById(request.user.id)

  if (body.title === undefined || body.url === undefined) {
    return response
      .status(400)
      .json({ error: 'Blog title and URL must be provided.' })
  }

  const blog = new Blog({ ...body, user: user.id })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog)
  await user.save()
  response.status(201).json(savedBlog)
})

// blogsRouter.put('/:id', async (request, response, next) => {
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: 'query',
  })
  response.json(updatedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  const blogToDelete = (await Blog.findById(request.params.id)).toJSON()

  // const decodedToken = jwt.verify(request.token, config.SECRET)
  // if (!request.token || !decodedToken.id) {
  //   return response.status(401).json({ error: 'token missing or invalid' })
  // }
  // const user = (await User.findById(decodedToken.id)).toJSON()
  const user = await User.findById(request.user.id)

  if (blogToDelete.user.toString() !== user.toJSON().id) {
    response.status(401).json({ error: 'only the author can delete a blog' })
  } else {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).json({ success: 'blog removed successfully' })
  }
})

module.exports = blogsRouter
