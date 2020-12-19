const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (
    body.username === undefined ||
    body.password === undefined ||
    body.password.length < 3 ||
    body.username.length < 3
  ) {
    return response.status(400).json({
      error:
        'User and password must be provided and be at least 3 charaters long.',
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    likes: 1,
    url: 1,
  })
  // const users = await User.find({}).populate('blogs', { title: 1, author: 1, likes: 1, url: 1, _id: 0 })  // Without ID
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id).populate('blogs', {
    title: 1,
    author: 1,
    likes: 1,
    url: 1,
  })
  if (user) {
    response.json(user.toJSON())
  } else {
    response.status(404).json({ error: 'User not found' })
  }
})

module.exports = usersRouter
