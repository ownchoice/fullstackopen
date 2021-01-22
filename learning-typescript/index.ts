import express from 'express'
import calculateBmi from './bmiCalculator'
const app = express()

if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan')
  app.use(
    morgan(
      ':method :url - status: :status - content-length: :res[content-length] - :response-time ms'
    )
  )
  // app.use(morgan('tiny'))
  // morgan.token('mitokenpropio', function (req: any, _res: any) {
  //   return JSON.stringify(req.body)
  // })
  // app.use(
  //   morgan(function (tokens: any, req: any, res: any) {
  //     if (tokens.method(req, res) === 'POST') {
  //       return [
  //         tokens.method(req, res),
  //         tokens.url(req, res),
  //         'status:',
  //         tokens.status(req, res),
  //         'content-length:',
  //         tokens.res(req, res, 'content-length'),
  //         '-',
  //         tokens['response-time'](req, res),
  //         'ms',
  //         tokens.mitokenpropio(req, res),
  //       ].join(' ')
  //     } else {
  //       return [
  //         tokens.method(req, res),
  //         tokens.url(req, res),
  //         'status:',
  //         tokens.status(req, res),
  //         'content-length:',
  //         tokens.res(req, res, 'content-length'),
  //         '-',
  //         tokens['response-time'](req, res),
  //         'ms',
  //       ].join(' ')
  //     }
  //   })
  // )
}

app.get('/', (_req: any, res: any) => {
  res.send('Go to the <a href="/hello">hello</a> endpoint')
})

app.get('/hello', (_req: any, res: any) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req: any, res: any) => {
  const height = req.query.height
  const weight = req.query.weight
  // console.log(height, weight)

  if (height === undefined || weight === undefined) {
    res.status(422).json({
      error: 'two parameters needed: weigth and height',
    })
  } else if (Number.isNaN(Number(height)) || Number.isNaN(Number(weight))) {
    res.status(422).json({
      error: 'malformatted parameters',
    })
  } else {
    res.send(calculateBmi(height, weight))
  }
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
