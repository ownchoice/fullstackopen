interface ExcersiceCalcResult {
  periodLength: number
  trainingDays: number
  targetValue: number
  average: number
  success: boolean
  rating: number
  ratingDescription: string
}

const calculateExercises = (
  dailyHoursOfExercise: Array<number>,
  target: number
) => {
  const average =
    dailyHoursOfExercise.reduce((a, b) => a + b, 0) /
    dailyHoursOfExercise.length
  let rating
  if (average >= target) {
    rating = 3
  } else if (average < target * 0.8) {
    rating = 1
  } else {
    rating = 2
  }
  const ratingDescription = [
    'Needs improvement, keep working on it',
    'Not too bad but could be better',
    'Good job, keep the good work',
  ]
  const result = {
    periodLength: dailyHoursOfExercise.length,
    trainingDays: dailyHoursOfExercise.filter((dailyHours) => dailyHours > 0)
      .length,
    targetValue: target,
    average: average,
    success: average >= target ? true : false,
    rating: rating,
    ratingDescription: ratingDescription[rating - 1],
  }
  return result
}

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 1.9))
// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 4))
if (require.main === module) {
  const parseNumbers = (args: Array<string>): Array<number> => {
    if (args.length < 2) throw new Error('Not enough arguments')
    // if (args.length > 4) throw new Error('Too many arguments');

    args.forEach((arg) => {
      if (Number.isNaN(Number(arg))) {
        throw new Error('Provided values were not numbers!')
      }
    })

    return args.map((arg) => Number(arg))
  }

  const parsedArguments = parseNumbers(process.argv.slice(2))

  console.log(
    console.log(
      calculateExercises(parsedArguments.slice(0, -1), parsedArguments[-1])
    )
  )
}

export default calculateExercises
