import { NewPatient, Gender } from './types/types';

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
