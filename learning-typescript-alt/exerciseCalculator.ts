type Result = {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
};

const calculateExercises = (
  target: number,
  dailyExerciseHours: number[]
): Result => {
  const average =
    dailyExerciseHours.reduce((total, current) => total + current) /
    dailyExerciseHours.length;
  // const target = 2;
  const rating = average < target * 0.8 ? 1 : average < target ? 2 : 3;
  const ratingsDesc = [
    "Needs improvement, don't give up!",
    "Almost there, keep going!",
    "Reached the goal, good job!",
  ];
  return {
    periodLength: dailyExerciseHours.length,
    trainingDays: dailyExerciseHours.filter((elem) => elem > 0).length,
    success: average >= target,
    rating,
    ratingDescription: ratingsDesc[rating - 1],
    target,
    average,
  };
};

export default calculateExercises;

// console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]));

// type ExerciseInputValues = {
//   dailyExercise: number[];
//   target: number;
// };

// const parseArgumentsExercise = (args: Array<string>): ExerciseInputValues => {
//   if (args.length < 4) throw new Error("Not enough arguments");
//   // if (args.length > 4) throw new Error('Too many arguments');

//   // if (
//   //   Array.isArray(args[2]) &&
//   //   !args[2].some((elem) => Number.isNaN(Number(elem))) &&
//   //   !Number.isNaN(Number(args[3]))
//   // ) {
//   if (args.slice(2).every((elem) => !Number.isNaN(Number(elem)))) {
//     return {
//       target: Number(args[2]),
//       dailyExercise: args.slice(3).map((elem) => Number(elem)),
//     };
//   } else {
//     throw new Error("Provided values were not numbers!");
//   }
// };

// try {
//   const { target, dailyExercise } = parseArgumentsExercise(process.argv);
//   console.log(calculateExercises(target, dailyExercise));
// } catch (e) {
//   console.error("Error, something bad happened, message: ", e as Error);
// }
