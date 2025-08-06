import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import calculateExercises from './exerciseCalculator'; 

const app = express();
app.use(bodyParser.json());

app.post('/exercises', (req: Request, res: Response) => {
  const body = req.body;

  if (!body.daily_exercises || !body.target) {
    return res.status(400).json({ error: "parameters missing" });
  }

  const { daily_exercises, target } = body;

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some(d => isNaN(Number(d))) ||
    isNaN(Number(target))
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const dailyHours = daily_exercises.map(Number);

  const result = calculateExercises(dailyHours, Number(target));
  return res.json(result);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
