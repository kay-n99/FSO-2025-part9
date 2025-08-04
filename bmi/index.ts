import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();
const PORT = 3003;

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});


app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (typeof height !== 'string' || typeof weight !== 'string') {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const parsedHeight = Number(height);
  const parsedWeight = Number(weight);

  if (isNaN(parsedHeight) || isNaN(parsedWeight) || !parsedHeight || !parsedWeight) {
    return res.status(400).json({ error: "malformatted parameters" });
  }


  const bmiResult = calculateBmi(parsedHeight, parsedWeight);
  
  return res.status(200).json({
    weight: parsedWeight,
    height: parsedHeight,
    bmi: bmiResult
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
