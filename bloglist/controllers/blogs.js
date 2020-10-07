const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  // const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, _id: 0 })  // Without ID
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (body.title === undefined || body.url === undefined) {
    return response.status(400).json({ error: 'Blog title and URL must be provided.' })
  }
  const users = await User.find({})
  const randomUser = users[Math.floor(Math.random() * users.length)]
  const blog = new Blog({...body, user: randomUser.id})
  const savedBlog = await blog.save()
  randomUser.blogs = randomUser.blogs.concat(savedBlog)
  await randomUser.save()
  response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
  response.json(updatedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter