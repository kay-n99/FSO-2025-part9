interface Values {
  target: number;
  dailyHours: number[];
}

 const parseArgs = (args: string[]): Values => {
  if (args.length < 3) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  const dailyHours = args.slice(3).map(Number);

  if (isNaN(target)) {
    throw new Error('Provided target was not a number!');
  }
  if (dailyHours.some(isNaN)) { 
    throw new Error('Provided daily hours contain non-numeric values!');
  }

  return {
    target,
    dailyHours
  };

};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercises(dailyHours: number[], target: number): Result {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(hours => hours > 0).length;
  const average = dailyHours.reduce((sum, hours) => sum + hours, 0) / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'great job';
  } else if (average >= target * 0.8) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'so bad';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
}


try {
  const { target, dailyHours } = parseArgs(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

export default calculateExercises;