import express from 'express'
import calculateBmi from './bmiCalculator'
const app = express()

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
  }

  if (Number.isNaN(Number(height)) || Number.isNaN(Number(weight))) {
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
