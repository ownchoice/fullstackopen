import express from 'express';
import calculateBmi from './bmiCalculator';
// import calculator from './calculator'
const app = express();
// import morgan from 'morgan';

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
  const morgan = require('morgan');
  app.use(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    morgan(
      ':method :url - status: :status - content-length: :res[content-length] - :response-time ms'
    )
  );
  // app.use(morgan('tiny'))
  // morgan.token('mitokenpropio', function (req, _res) {
  //   return JSON.stringify(req.body)
  // })
  // app.use(
  //   morgan(function (tokens, req, res) {
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

app.get('/', (_req, res) => {
  res.send('Go to the <a href="/hello">hello</a> endpoint');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  // console.log(height, weight)

  if (req.query.height === undefined || req.query.weight === undefined) {
    res.status(422).json({
      error: 'two parameters needed: weigth and height',
    });
  } else if (Number.isNaN(Number(height)) || Number.isNaN(Number(weight))) {
    res.status(422).json({
      error: 'malformatted parameters',
    });
  } else {
    res.send(calculateBmi(height, weight));
  }
});

// app.get('/calculate', (req, res) => {
//   const { value1, value2, op } = req.query

//   const result = calculator(value1, value2, op)
//   res.send(result)
// })

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
