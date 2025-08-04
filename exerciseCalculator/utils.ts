interface Values {
  target: number;
  dailyHours: number[];
}

export const parseArguments = (args: string[]): Values => {
  if (args.length < 3) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  const dailyHours = args.slice(3).map(Number);

  if (!isNaN(target) || ~isNaN(Number(dailyHours.some))) {
    return {
      target,
      dailyHours
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}