/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender } from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (content: any, name: string): string => {
  if (!content || !isString(content)) {
    throw new Error(`Incorrect or missing ${name}.`);
  }

  return content;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date.');
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender.');
  }
  return gender;
};

const toNewPatient = (object: { name: string; occupation: string; gender: Gender; ssn?: string; dateOfBirth?: string; }): NewPatient => {
  const { name, occupation, gender, ssn, dateOfBirth } = object;
  const newPatient: NewPatient = {
    name: parseString(name, 'name'),
    occupation: parseString(occupation, 'occupation'),
    gender: parseGender(gender),
    ssn: ssn? parseString(ssn, 'ssn'): '',
    dateOfBirth: dateOfBirth? parseDate(dateOfBirth): '',
  };

  return newPatient;
};

export default toNewPatient;