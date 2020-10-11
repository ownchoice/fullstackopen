const logger = require('./logger')
// const config = require('./config')
// const jwt = require('express-jwt')

const requestLogger = (request, response, next) => {
  logger.info('---')
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token UNO' })
  } else if (error.name === 'UnauthorizedError') {
    return response.status(401).json({ error: 'invalid token DOS' })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
    // console.log(response.token)
  } else {
    request.token = null
    // console.log(response)
  }
  next()
}

const userAuthenticationRequired = (request, response, next) => {
  // console.log(request.user)
  if (!request.user) {
    response.sendStatus(401).json({ error: 'invalid token' })
  }
  next()
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userAuthenticationRequired
}