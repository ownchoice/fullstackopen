import express from 'express';
import calculateBmi from './bmiCalculator';
// import calculator from './calculator'
import calculateExercises from './exerciseCalculator';
const app = express();
app.use(express.json());
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
    res.status(400).json({
      error: 'two parameters needed: weigth and height',
    });
  } else if (Number.isNaN(Number(height)) || Number.isNaN(Number(weight))) {
    res.status(400).json({
      error: 'malformatted parameters',
    });
  } else {
    res.send(calculateBmi(height, weight));
  }
});


app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  const body: any = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (body.daily_exercises === undefined || body.target === undefined) {
    res.status(400).json({
      error: 'parameters missing: daily_exercises and/or target',
    });
  }


  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
  if (Number.isNaN(Number(body.target)) || !Array.isArray(body.daily_exercises) || body.daily_exercises.some((element: any) => Number.isNaN(Number(element)))) {
    res.status(400).json({
      error: 'malformatted parameters',
    });
  } else {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const dailyHoursOfExercise: Array<number> = body.daily_exercises;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const target = Number(body.target);

    res.send(calculateExercises(dailyHoursOfExercise, target));
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
