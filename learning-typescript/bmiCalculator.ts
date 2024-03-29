const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);
  let category = '';
  if (bmi < 15) {
    category = 'Very severely underweight';
  } else if (15 <= bmi && bmi < 16) {
    category = 'Severely underweight';
  } else if (16 <= bmi && bmi < 18.5) {
    category = 'Underweight ';
  } else if (18.5 <= bmi && bmi < 25) {
    category = 'Normal (healthy weight)';
  } else if (25 <= bmi && bmi < 30) {
    category = 'Overweight';
  } else if (30 <= bmi && bmi < 35) {
    category = 'Obese Class I (Moderately obese)';
  } else if (35 <= bmi && bmi < 40) {
    category = 'Obese Class II (Severely obese)';
  } else if (bmi >= 40) {
    category = 'Obese Class III (Very severely obese)';
  }

  return category;
};

// console.log(calculateBmi(180, 74));
// console.log(calculateBmi(182, 60));

// https://stackoverflow.com/questions/4981891/node-js-equivalent-of-pythons-if-name-main
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 2) throw new Error('Not enough arguments');
  if (args.length > 2) throw new Error('Too many arguments');

  args.forEach((arg) => {
    if (Number.isNaN(Number(arg))) {
      throw new Error('Provided values were not numbers!');
    }
  });

  console.log(calculateBmi(Number(args[0]), Number(args[1])));
}

export default calculateBmi;
