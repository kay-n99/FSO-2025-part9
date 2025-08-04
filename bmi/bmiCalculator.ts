export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmiValue = weight / (heightInMeters * heightInMeters);

  if (bmiValue < 16) {
    return "Underweight (Severe Thinness)";
  } else if (bmiValue >= 16 && bmiValue < 17) {
    return "Underweight (Moderate Thinness)";
  } else if (bmiValue >= 17 && bmiValue < 18.5) {
    return "Underweight (Mild Thinness)";
  } else if (bmiValue >= 18.5 && bmiValue < 25) {
    return "Normal range";
  } else if (bmiValue >= 25 && bmiValue < 30) {
    return "Overweight (Pre-obese)";
  } else if (bmiValue >= 30 && bmiValue < 35) {
    return "Obese (Class I)";
  } else if (bmiValue >= 35 && bmiValue < 40) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
};


interface CmdLineValues {
  height: number;
  weight: number;
}


const parseArgs = (args: string[]): CmdLineValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};


if (require.main === module) {
  try {
    const { height, weight } = parseArgs(process.argv);
    const result = calculateBmi(height, weight);
    console.log(`Your BMI is: ${result}`);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}
