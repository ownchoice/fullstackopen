import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { weight, height } = req.query;

  if (
    weight === "" ||
    height === "" ||
    weight === undefined ||
    height === undefined
  ) {
    res.status(400).json({
      error: "parameters missing",
    });
    return;
  }

  if (isNaN(Number(weight)) || isNaN(Number(height))) {
    res.status(400).json({
      error: "malformatted parameters",
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.post("/exercises", (req: any, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;

  if (
    target === "" ||
    daily_exercises === "" ||
    target === undefined ||
    daily_exercises === undefined
  ) {
    res.status(400).json({
      error: "parameters missing",
    });
    return;
  }

  if (
    isNaN(Number(target)) ||
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((elem) => isNaN(Number(elem)))
  ) {
    res.status(400).json({
      error: "malformatted parameters",
    });
    return;
  }

  res.json(calculateExercises(target, daily_exercises));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
