type Result = {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
};

const calculateExercises = (dailyExerciseHours: number[]): Result => {
  const average =
    dailyExerciseHours.reduce((total, current) => total + current) /
    dailyExerciseHours.length;
  const target = 2;
  const rating = average < target * 0.8 ? 1 : average < target ? 2 : 3;
  const ratingsDesc = [
    "Needs improvement, don't give up!",
    'Almost there, keep going!',
    'Reached the goal, good job!',
  ];
  return {
    periodLength: dailyExerciseHours.length,
    trainingDays: dailyExerciseHours.filter((elem) => elem > 0).length,
    success: target >= average,
    rating,
    ratingDescription: ratingsDesc[rating - 1],
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]));
