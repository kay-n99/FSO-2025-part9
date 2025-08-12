import express from 'express';
import patientService from "../services/patientService";
import { parseNewPatient } from '../utils/utils';
import toNewEntry from '../utils/toNewEntry';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = parseNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Unknown error' });
    }
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  if(!patient){
    return res.status(404).send({ error: 'Patient not found'});
  }
  return res.json(patient);
});

router.post('/:id/entries', (req, res) => {
  try{ 
    const newEntry = toNewEntry(req.body);
    const updatedPatient = patientService.addEntry(req.params.id, newEntry);
    res.json(updatedPatient)
  }catch(e: unknown){
    let errorMessage = 'Something went wrong';
    if(e instanceof Error){
      errorMessage += ' Error: ' + e.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;