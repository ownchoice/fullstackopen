import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { weight, height } = req.query;

  if (
    isNaN(Number(weight)) ||
    isNaN(Number(height)) ||
    weight === '' ||
    height === ''
  ) {
    res.status(400).json({
      error: 'malformatted parameters',
    });
    return;
  }

  const bmi: string = calculateBmi(Number(height), Number(weight));
  res.json({
    weight,
    height,
    bmi,
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
