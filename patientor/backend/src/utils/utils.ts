import { NewPatient, Gender } from '../types/types';
import { z } from 'zod';
import { Diagnosis } from '../types/types';

// Type guard for string
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// Type guard for Date
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// Type guard for Gender enum
const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Invalid or missing name');
  }
  return name;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Invalid or missing dateOfBirth');
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Invalid or missing ssn');
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Invalid or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Invalid or missing occupation');
  }
  return occupation;
};

export const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if(!object || typeof object !== 'object' || !('diagnosisCodes' in object)){
    return [] as Array<Diagnosis['code']>;
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

// Main parser function
export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Invalid or missing data');
  }

  const obj = object as { [key: string]: unknown };

  return {
    name: parseName(obj.name),
    dateOfBirth: parseDateOfBirth(obj.dateOfBirth),
    ssn: parseSsn(obj.ssn),
    gender: parseGender(obj.gender),
    occupation: parseOccupation(obj.occupation)
  };
};

export const NewPatientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  dateOfBirth: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: 'Invalid date format'
  }),
  ssn: z.string().min(1, 'SSN is required'),
  gender: z.nativeEnum(Gender),
  occupation: z.string().min(1, 'Occupation is required')
});

export const parseNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};